// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

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