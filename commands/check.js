// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const config = require('../config.js')
const fetch = require('cross-fetch')
const extractUrls = require("extract-urls");

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let input = interaction.data.options.find(x => x.name == 'domain').value

    let URLs = extractUrls(input)

    let domain
    if (URLs && URLs[0]) {
        domain = (new URL(URLs[0])).hostname
    } else {
        domain = input.split('/')[0]
    }

    let response = await fetch(config.api + `/check?domain=${domain}`, {
        method: 'GET',
        headers: {
            'X-Identity': config.identifier
        }
    })

    let data = await response.json()

    if (data.blocked) {
        interaction.createMessage({
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
        interaction.createMessage({
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

module.exports.options = {
    name: 'check',
    description: 'Checks if a domain is being detected',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'domain',
        description: 'The domain to check',
        required: true
    }]
}