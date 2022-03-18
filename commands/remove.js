// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const config = require('../config.js')
const fetch = require('cross-fetch')

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    if (interaction.guildID != config.devGuild) {
        interaction.createMessage({ content: 'This guild is not allowed to use administrative commands!', flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to use this!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    let domain = interaction.data.options.find(x => x.name == 'domain').value

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

    interaction.createMessage({ content: `Removed **${domain}** from blocklist`, flags: Constants.MessageFlags.EPHEMERAL })

}

module.exports.devGuildOnly = true

module.exports.options = {
    name: 'remove',
    description: 'Remove a domain from the blocklist',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'domain',
        description: 'The domain to remove',
        required: true
    }]
}