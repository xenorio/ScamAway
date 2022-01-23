const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js')
const fetch = require('cross-fetch')

module.exports.run = async(client, interaction) => {

    if (interaction.guildId != config.devGuild) {
        interaction.reply({ content: 'This guild is not allowed to use administrative commands!', ephemeral: true })
        return
    }

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        interaction.reply({ content: "Only administrators are allowed to use this!", ephemeral: true })
        return
    }

    let domain = interaction.options.get('domain', true).value
    let reason = interaction.options.get('reason', false).value

    let res = await fetch(config.api + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.apiKey
        },
        body: JSON.stringify({
            domain: domain,
            reason: reason
        })
    })

    interaction.reply({ content: `Added **${domain}** to blocklist`, ephemeral: true })

}

module.exports.devGuildOnly = true

module.exports.builder = new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds a domain to the blocklist')
    .addStringOption(option =>
        option.setName('domain')
        .setDescription('The domain to add')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for adding it')
    )