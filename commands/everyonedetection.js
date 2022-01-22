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