// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const util = require('../util/util')

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let guild = client.guilds.get(interaction.guildID)

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    if (!guild.permissionsOf(client.user.id).has('manageMessages')) {
        interaction.createMessage({ content: "I don't have the required permission to delete messages!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    switch (interaction.data.values[0]) {
        case "kick":
            if (!guild.permissionsOf(client.user.id).has('kickMembers')) {
                interaction.createMessage({ content: "I don't have the required permission to kick members!", flags: Constants.MessageFlags.EPHEMERAL })
                return
            }
            break;

        case "ban":
            if (!guild.permissionsOf(client.user.id).has('banMembers')) {
                interaction.createMessage({ content: "I don't have the required permission to ban members!", flags: Constants.MessageFlags.EPHEMERAL })
                return
            }
            break;

        default:
            break;
    }

    let settings = await util.getSettings(interaction.guildID)
    settings.action = interaction.data.values[0]
    util.setSettings(interaction.guildID, settings)

    interaction.createMessage({ content: 'Settings saved!', flags: Constants.MessageFlags.EPHEMERAL })
}