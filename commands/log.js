// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');

module.exports.run = async(client, interaction) => {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to change settings!", ephemeral: true })
        return
    }

    let channel = interaction.options.get('log-channel', true).value

    if (!interaction.guild.me.permissionsIn(channel).has('SEND_MESSAGES') || !interaction.guild.me.permissionsIn(channel).has('VIEW_CHANNEL')) {
        interaction.reply({ content: "I don't have the required permission to send messages in that channel!", ephemeral: true })
        return
    }

    let settings = JSON.parse(await client.db.get(interaction.guildId))
    settings.logs = channel
    client.db.put(interaction.guildId, JSON.stringify(settings))

    interaction.reply({ content: 'Settings saved!', ephemeral: true })

}

module.exports.builder = new SlashCommandBuilder()
    .setName('log')
    .setDescription('Set up logging')
    .addChannelOption(option =>
        option.setName('log-channel')
        .setDescription('Channel for logging')
        .setRequired(true)
        .addChannelType(ChannelType.GuildText)
    )