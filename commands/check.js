const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js')
const fetch = require('cross-fetch')
const extractUrls = require("extract-urls");

module.exports.run = async(client, interaction) => {

    let input = interaction.options.get('domain', true).value

    let URLs = extractUrls(input)

    let domain
    if (URLs && URLs[0]) {
        domain = (new URL(URLs[0])).hostname
    } else {
        domain = input.split('/')[0]
    }

    let response = await fetch(config.api + `/check?domain=${domain}`, {
        method: 'GET'
    })

    let data = await response.json()

    if (data.blocked) {
        interaction.reply({
            "embeds": [{
                "title": "Domain Check",
                "description": domain,
                "color": 255,
                "fields": [{
                        "name": "Blocked",
                        "value": "Yes"
                    },
                    {
                        "name": "Reason",
                        "value": data.reason || 'No reason provided'
                    }
                ]
            }]
        })
    } else {
        interaction.reply({
            "embeds": [{
                "title": "Domain Check",
                "description": domain,
                "color": 255,
                "fields": [{
                    "name": "Blocked",
                    "value": "No"
                }]
            }]
        })
    }

}

module.exports.builder = new SlashCommandBuilder()
    .setName('check')
    .setDescription('Checks if a domain is being detected')
    .addStringOption(option =>
        option.setName('domain')
        .setDescription('The domain to check')
        .setRequired(true)
    )