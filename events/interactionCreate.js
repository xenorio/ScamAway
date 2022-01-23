const colors = require('colors');
const fs = require('fs');

module.exports = async(client, interaction) => {

    // Prevent commands from DMs
    if (!interaction.inGuild()) {
        interaction.reply({ content: 'This bot can only be used directly inside guilds' })
        return
    }

    if (interaction.isCommand()) {
        // If command does not exist, throw error
        if (!client.commands[interaction.commandName]) {
            interaction.reply({ content: `Whoops! I don't know this command.`, ephemeral: true })
            process.log(`Unknown command "${interaction.commandName}"`, 'WARN')
            return
        }

        // Run command
        process.log(`Running command ${colors.bold(interaction.commandName)}`)
        client.commands[interaction.commandName].run(client, interaction)
    }

    if (interaction.isSelectMenu()) {
        if (!fs.existsSync(`./components/select_menu/${interaction.customId}.js`)) {
            interaction.reply({ content: 'Whoops! This interaction is not known.', ephemeral: true })
            process.log(`Unknown interaction ID ${colors.bold(interaction.customId)}`, 'ERROR')
            return
        }
        require(`../components/select_menu/${interaction.customId}.js`).run(client, interaction)
    }

};