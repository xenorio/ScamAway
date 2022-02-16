// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

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