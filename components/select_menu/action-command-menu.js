module.exports.run = async(client, interaction) => {

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to change settings!", ephemeral: true })
        return
    }

    if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) {
        interaction.reply("I don't have the required permission to delete messages!")
        return
    }

    switch (interaction.values[0]) {
        case "kick":
            if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
                interaction.reply("I don't have the required permission to kick members!")
                return
            }
            break;

        case "ban":
            if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
                interaction.reply("I don't have the required permission to ban members!")
                return
            }
            break;

        default:
            break;
    }

    let settings = JSON.parse(await client.db.get(interaction.guildId))
    settings.action = interaction.values[0]
    client.db.put(interaction.guildId, JSON.stringify(settings))

    interaction.reply({ content: 'Settings saved!', ephemeral: true })
}