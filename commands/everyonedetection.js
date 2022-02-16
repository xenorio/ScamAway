// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports.run = async(client, interaction) => {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to change settings!", ephemeral: true })
        return
    }
    interaction.reply({
        ephemeral: true,
        content: 'This automatically detects messages that contain an unauthorized @everyone and at least 1 link.\nLinks are automatically being reported.',
        components: [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId('everyonedetection-command-menu')
                .addOptions([{
                        label: 'Enable',
                        description: 'Enables @everyone detection',
                        value: 'enable'
                    },
                    {
                        label: 'Disable',
                        description: 'Disables @everyone detection',
                        value: 'disable'
                    }
                ])
            )
        ]
    })
}

module.exports.builder = new SlashCommandBuilder()
    .setName('everyonedetection')
    .setDescription('Choose what happens when an unauthorized @everyone is detected')