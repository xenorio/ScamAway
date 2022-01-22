module.exports.run = async(client, interaction) => {

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to change settings!", ephemeral: true })
        return
    }

    let settings = JSON.parse(await client.db.get(interaction.guildId))

    switch (interaction.values[0]) {
        case "enable":
            settings.everyoneDetection = true
            break;

        case "disable":
            settings.everyoneDetection = false
            break;

        default:
            break;
    }

    client.db.put(interaction.guildId, JSON.stringify(settings))

    interaction.reply({ content: 'Settings saved!', ephemeral: true })
}