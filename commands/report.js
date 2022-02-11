const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch')
const config = require('../config.js')
const extractUrls = require("extract-urls");

module.exports.run = async(client, interaction) => {

    let input = interaction.options.get('url', true).value

    let URLs = extractUrls(input)

    if (!URLs || !URLs[0]) {
        interaction.reply({ content: 'Please provide the full URL (Not just the domain)', ephemeral: true })
        return
    }

    URLs.forEach(url => {
        fetch(config.api + '/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                user: interaction.user.tag
            })
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