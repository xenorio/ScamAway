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

module.exports = async(client, message) => {

    let settings = JSON.parse(await client.db.get(message.guild.id))

    let URLs = extractUrls(message.content, true)
    if (URLs) {

        for (let url of URLs) {

            let domain = (new URL(url)).hostname

            let response = await fetch(config.api + `/check?domain=${domain}`, {
                method: 'GET'
            })
            let body = await response.json()

            if (body.blocked) {
                detectMessage(message, settings, body)
                process.log('Detected message containing ' + colors.bold(domain))
                return
            }

        }

        // @everyone detection
        if (settings.everyoneDetection) {
            if (message.content.includes('@everyone') && !message.member.permissionsIn(message.channel).has('MENTION_EVERYONE')) {
                detectMessage(message, settings)

                // Report all URLs in message
                let reportURLs = ""
                for (let url of URLs) {
                    reportURLs += `${url}\n`
                }
                fetch(config.api + '/report', {
                    method: 'POST',
                    headers: {
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

function detectMessage(message, settings, data) {

    // Log detections
    if (settings.logs) {
        let logChannel = message.guild.channels.resolve(settings.logs)
        if (logChannel) logChannel.send({
            "embeds": [{
                "title": "Bad Link Detected",
                "description": message.content,
                "color": 16711680,
                "timestamp": new Date().toISOString(),
                "author": {
                    "name": message.author.tag,
                    "icon_url": message.author.avatarURL()
                },
                fields: [{
                    name: 'Reason',
                    value: data.reason || 'No reason provided'
                }]
            }]
        })
    }

    if (settings.action == "nothing") return

    message.delete().catch(err => {})

    switch (settings.action) {
        case "kick":
            process.log(`Kicking ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
            message.member.kick({ reason: "Bad link detected!" }).catch((err) => { process.log(err.message, 'ERROR') })
            break;

        case "ban":
            process.log(`Banning ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
            message.member.ban({ reason: "Bad link detected!" }).catch((err) => { process.log(err.message, 'ERROR') })
            break;

        default:
            break;
    }
}