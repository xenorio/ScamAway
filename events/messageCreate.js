// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const fetch = require('cross-fetch')
const config = require('../config.js')
const colors = require('colors')
const extractUrls = require("extract-urls");
const util = require('../util/util')
const whitelist = require('../util/whitelist')
const redirects = require('../util/redirects')

module.exports = async(client, message) => {

    if (!message.guildID) return

    let settings = await util.getSettings(message.guildID)

    let URLs = extractUrls(message.content, true)
    if (URLs) {

        for (let url of URLs) {

            let domain = (new URL(url)).hostname

            if (whitelist.check(domain)) continue

            let data = await util.checkDomain(domain)

            if (data.blocked) {
                detectMessage(message, settings, redirData)
                util.log('Detected message containing ' + colors.bold(domain))
                return
            }

            // Follow redirects
            if (config.followRedirects.enabled) {

                let redirs = await redirects.resolve(url) // Get all redirects

                // Check every redirect with API
                for (let redir of redirs) {

                    if (whitelist.check(redir)) continue

                    let redirData = await util.checkDomain(redir)

                    if (redirData.blocked) {
                        detectMessage(message, settings, redirData)
                        util.log('Detected message containing ' + colors.bold(redir))
                        return
                    }

                }
            }

        }

        // @everyone detection
        if (settings.everyoneDetection) {
            if (message.content.includes('@everyone') && !message.channel.permissionsOf(message.member.id).has('mentionEveryone')) {
                detectMessage(message, settings, { reason: 'Unauthorized @everyone' })

                // Report all URLs in message
                let reportURLs = ""
                for (let url of URLs) {
                    let domain = (new URL(url)).hostname
                    if (whitelist.check(domain)) continue
                    reportURLs += `${url}\n`
                }
                fetch(config.api + '/report', {
                    method: 'POST',
                    headers: {
                        'X-Identity': config.identifier,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: reportURLs
                    })
                })

            }
        }

    }

};

async function detectMessage(message, settings, data) {

    // Log detections
    let logPayload = {
        "embeds": [{
            "title": "Bad Link Detected",
            "description": message.content,
            "color": 16711680,
            "timestamp": new Date().toISOString(),
            "author": {
                "name": `${message.author.username}#${message.author.discriminator}`,
                "icon_url": message.author.avatarURL
            },
            fields: [{
                name: 'Reason',
                value: data.reason || 'No reason provided'
            }]
        }]
    }

    if (settings.logHook) {

        fetch(settings.logHook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logPayload)
        })

    } else if (settings.logs) {
        let logChannel = message.guild.channels.resolve(settings.logs)
        if (logChannel) logChannel.send(logPayload)
    }

    if (settings.action == "nothing") return

    message.delete().catch(err => {})

    switch (settings.action) {
        case "kick":
            message.member.kick("Bad link detected!").catch((err) => { process.log(err.message, 'ERROR') })
            break;

        case "ban":
            message.member.ban(0, "Bad link detected!").catch((err) => { process.log(err.message, 'ERROR') })
            break;

        default:
            break;
    }
}