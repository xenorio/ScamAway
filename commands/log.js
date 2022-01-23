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