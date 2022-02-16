// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js')
const fetch = require('cross-fetch')

module.exports.run = async(client, interaction) => {

    if (interaction.guildId != config.devGuild) {
        interaction.reply({ content: 'This guild is not allowed to use administrative commands!', ephemeral: true })
        return
    }

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to use this!", ephemeral: true })
        return
    }

    let domain = interaction.options.get('domain', true).value

    fetch(config.api + '/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.apiKey
        },
        body: JSON.stringify({
            domain: domain
        })
    })

    interaction.reply({ content: `Removed **${domain}** from blocklist`, ephemeral: true })

}

module.exports.devGuildOnly = true

module.exports.builder = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a domain from the blocklist')
    .addStringOption(option =>
        option.setName('domain')
        .setDescription('The domain to remove')
        .setRequired(true)
    )