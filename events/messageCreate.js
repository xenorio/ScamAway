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
                detectMessage(message, settings)
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

function detectMessage(message, settings) {

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
                }
            }]
        })
    }

    if (settings.action == "nothing") return

    message.delete().catch(err => {})

    switch (settings.action) {
        case "kick":
            process.log(`Kicking ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
            message.member.kick("Bad link detected!").catch(() => {})
            break;

        case "ban":
            process.log(`Banning ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
            message.member.ban("Bad link detected!").catch(() => {})
            break;

        default:
            break;
    }
}