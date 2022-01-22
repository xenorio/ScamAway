const colors = require('colors')

module.exports = async(client, interaction) => {

    // Ignore non-commands
    if (!interaction.isCommand) return

    // If command does not exist, throw error
    if (!client.commands[interaction.commandName]) {
        interaction.reply(`Whoops! I don't know this command.`)
        process.log(`Unknown command "${interaction.commandName}"`, 'WARN')
        return
    }

    // Run command
    process.log(`Running command ${colors.bold(interaction.commandName)}`)
    client.commands[interaction.commandName].run(client, interaction)

};