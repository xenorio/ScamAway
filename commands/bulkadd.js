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

    let domains = interaction.options.get('domains', true).value
    domains = domains.split(';')
    let reason = interaction.options.get('reason', false)
    if (reason) reason = reason.value // Fixes error when no reason is provided because discord.js doesn't just make the value undefined but the entire option.

    for (let domain of domains) {
        await fetch(config.api + '/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.apiKey
            },
            body: JSON.stringify({
                domain: domain,
                reason: reason
            })
        })
    }

    interaction.reply({ content: `Added **${domains.length}** domains to blocklist`, ephemeral: true })

}

module.exports.devGuildOnly = true

module.exports.builder = new SlashCommandBuilder()
    .setName('bulkadd')
    .setDescription('Adds multiple domains to the blocklist')
    .addStringOption(option =>
        option.setName('domains')
        .setDescription('The domains to add, separated by ;')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for adding them')
    )