const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.run = async(client, interaction) => {
    interaction.reply("Pong 🏓\n``" + client.ws.ping + "ms``")
    process.log('pipi');
}

module.exports.builder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Show the current ping')