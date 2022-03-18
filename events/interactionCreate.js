// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const colors = require('colors');
const fs = require('fs');
const commands = require('../util/commands')

const { Constants } = require('eris')

module.exports = async(client, interaction) => {

    // Prevent commands from DMs
    if (!interaction.guildID) {
        interaction.createMessage({ content: 'This bot can only be used directly inside guilds' })
        return
    }

    switch (interaction.type) {
        case Constants.InteractionTypes.APPLICATION_COMMAND:
            process.log(`Running command ${colors.bold(interaction.data.name)}`)
            commands.get(interaction.data.name).run(client, interaction)
            break;

        case Constants.InteractionTypes.MESSAGE_COMPONENT:
            if(!fs.existsSync(`./components/${interaction.data.custom_id}.js`)) break
            require(`../components/${interaction.data.custom_id}.js`).run(client, interaction)
            break;

        default:
            break;
    }

};