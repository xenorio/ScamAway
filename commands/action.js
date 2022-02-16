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
        content: 'Select what should happen when phishing is detected',
        components: [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId('action-command-menu')
                .addOptions([{
                        label: 'Nothing',
                        description: 'Do nothing. In case you only want to use the log feature.',
                        value: 'nothing'
                    },
                    {
                        label: 'Delete',
                        description: 'Just delete the message',
                        value: 'delete'
                    },
                    {
                        label: 'Delete & Kick',
                        description: 'Delete the message and kick the author',
                        value: 'kick'
                    },
                    {
                        label: 'Delete & Ban',
                        description: 'Delete the message and ban the author',
                        value: 'ban'
                    }
                ])
            )
        ]
    })
}

module.exports.builder = new SlashCommandBuilder()
    .setName('action')
    .setDescription('Choose what happens when phishing is detected')