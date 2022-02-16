// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch')
const config = require('../config.js')
const extractUrls = require("extract-urls");

module.exports.run = async(client, interaction) => {

    let input = interaction.options.get('url', true).value

    let URLs = extractUrls(input)

    if (!URLs || !URLs[0]) {
        interaction.reply({ content: 'Please provide the full URL (Not just the domain)', ephemeral: true })
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
                user: interaction.user.tag
            })
        })
    })

    interaction.reply({ content: 'Thanks for your report!', ephemeral: true })

}

module.exports.builder = new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a link')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The URL you want to report')
        .setRequired(true)
    )