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