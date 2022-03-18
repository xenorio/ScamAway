// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const fetch = require('cross-fetch')
const config = require('../config.js')
const extractUrls = require("extract-urls");

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let input = interaction.data.options.find(x => x.name == 'url').value

    let URLs = extractUrls(input)

    if (!URLs || !URLs[0]) {
        interaction.createMessage({ content: 'Please provide the full URL (Not just the domain)', flags: 64 })
        return
    }

    URLs.forEach(url => {
        fetch(config.api + '/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                user: `${interaction.member.username}#${interaction.member.discriminator}`
            })
        })
    })

    interaction.createMessage({ content: 'Thanks for your report!', flags: 64 })

}

module.exports.options = {
    name: 'report',
    description: 'Report a link',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'url',
        description: 'The URL you want to report',
        required: true
    }]
}