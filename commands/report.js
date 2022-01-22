const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch')
const config = require('../config.js')

module.exports.run = async(client, interaction) => {

    let url = interaction.options.get('url', true).value

    fetch(config.api + '/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    })

    interaction.reply({ content: 'Thanks for your report!', ephemeral: true })

}

module.exports.builder = new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a link')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The URL you want to report')
        .setRequired(true)
    )