// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const fs = require('fs')
const colors = require('colors')
const { log } = require('./util')
const config = require('../config')

let commands = {}

module.exports.load = async(client) => {

    log('Loading commands')

    let commandOptions = []
    let devCommandOptions = []

    commands = {}

    // Get all file names in commands dir
    await fs.readdir('./commands/', (err, files) => {

        if (err) {
            log('Unable to load commands. ' + err.message, 'ERROR')
            process.exit()
        }

        files.forEach(file => {

            // Ignore non-js files
            if (!file.endsWith('.js')) return

            // Parse command name from file name
            let name = file.split('.')[0]

            if ([
                    'ping',
                    'stats',
                    'report',
                    'everyonedetection',
                    'action',
                    'log',
                    'check'
                ].indexOf(name) <= -1) return

            // Load command
            let command = require(`../commands/${file}`)

            // Add command to commands object
            commands[name] = command

            if (command.devGuildOnly) {
                devCommandOptions.push(command.options)
            } else {
                commandOptions.push(command.options)
            }

            log(`Loaded command ${colors.bold(name)} successfully`)

        })

        client.bulkEditCommands(commandOptions)
        if (config.devGuild) client.bulkEditGuildCommands(config.devGuild, devCommandOptions)

    })
}

module.exports.get = (name) => {
    if (commands[name]) {
        return commands[name]
    } else {
        return null
    }
}