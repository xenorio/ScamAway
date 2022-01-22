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
                message.delete()
                process.log('Deleted message containing ' + colors.bold(domain))

                switch (settings.action) {
                    case "kick":
                        process.log(`Kicking ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
                        message.member.kick("Phishing detected!").catch(() => {})
                        break;

                    case "ban":
                        process.log(`Banning ${colors.bold(message.author.tag)} from guild ${colors.bold(message.guild.name)}`)
                        message.member.ban("Phishing detected!").catch(() => {})
                        break;

                    default:
                        break;
                }

                return
            }

        }
    }

};