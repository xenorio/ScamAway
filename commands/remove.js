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

    fetch(config.api + '/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.apiKey
        },
        body: JSON.stringify({
            domain: domain
        })
    })

    interaction.reply({ content: `Removed **${domain}** from blocklist`, ephemeral: true })

}

module.exports.devGuildOnly = true

module.exports.builder = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a domain from the blocklist')
    .addStringOption(option =>
        option.setName('domain')
        .setDescription('The domain to remove')
        .setRequired(true)
    )