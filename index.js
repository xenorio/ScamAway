// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const discord = require('discord.js')
const fs = require('fs')
const colors = require('colors')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const level = require('level')

console.log(`${colors.brightMagenta(`
8""""8                    8""""8                       
8      eeee eeeee eeeeeee 8    8 e   e  e eeeee e    e 
8eeeee 8  8 8   8 8  8  8 8eeee8 8   8  8 8   8 8    8 
    88 8e   8eee8 8e 8  8 88   8 8e  8  8 8eee8 8eeee8 
e   88 88   88  8 88 8  8 88   8 88  8  8 88  8   88   
8eee88 88e8 88  8 88 8  8 88   8 88ee8ee8 88  8   88 `)}
               ${'- '.yellow + 'The Anti-Phishing Bot'.cyan + ' -'.yellow}       
         ${'https://github.com/Xenorio/ScamAway/'.gray}            
`)

// Make log function available globally
process.log = log

var config
var rest
var client

init()

async function init() {

    await loadConfig()
    await loadDatabase()

    // Create bot client
    client = new discord.Client({
        intents: ["GUILDS", "GUILD_MESSAGES"],
        presence: config.presence
    })

    await loadEvents()

    // Set up direct Discord API communication
    rest = new REST({ version: '9' }).setToken(config.token);

    // Login
    await client.login(config.token)
        .catch(err => {
            log('Unable to log in. Please check the bot token.\nMessage from Discord: ' + err.message, 'ERROR')
            process.exit()
        })

    loadCommands()

}

async function loadConfig() {

    log('Loading configuration')

    // If config.js does not exist, create with config.default.js
    if (!fs.existsSync('./config.js')) {
        log('Could not detect config.js - Automatically creating from config.default.js')
        await fs.copyFile('./config.default.js', './config.js', () => { })
    }

    // Load
    config = await require('./config.js')
}

async function loadCommands() {

    log('Loading commands')

    client.commands = {}

    // Get all file names in commands dir
    await fs.readdir('./commands/', (err, files) => {

        if (err) {
            log('Unable to load commands. ' + err.message, 'ERROR')
            process.exit()
        }

        let builders = [] // List of command builders for registering with Discord
        let devBuilders = []

        files.forEach(file => {

            // Ignore non-js files
            if (!file.endsWith('.js')) return

            // Parse command name from file name
            let name = file.split('.')[0]

            // Load command
            let command = require(`./commands/${file}`)

            // Add command to commands object
            client.commands[name] = command

            if (command.devGuildOnly) {
                // Add to list for registering in dev guild only
                devBuilders.push(command.builder)
            } else {
                // Add to list for registering globally
                builders.push(command.builder)
            }

            log(`Loaded command ${colors.bold(name)} successfully`)

        })

        // Register commands as global slash commands
        rest.put(Routes.applicationCommands(client.user.id), { body: builders })

        // Register dev guild commands
        if(config.devGuild)rest.put(Routes.applicationGuildCommands(client.user.id, config.devGuild), { body: devBuilders })

    })
}

async function loadEvents() {

    log('Loading events')

    // Get all file names in commands dir
    await fs.readdir('./events/', (err, files) => {

        if (err) {
            log('Unable to load events. ' + err.message, 'ERROR')
            process.exit()
        }

        files.forEach(file => {

            // Ignore non-js files
            if (!file.endsWith('.js')) return

            // Parse event name from file name
            let name = file.split('.')[0]

            // Load event
            let event = require(`./events/${file}`)

            // Bind event
            client.on(name, event.bind(null, client))

            log(`Loaded event ${colors.bold(name)} successfully`)

        })

    })

}

function loadDatabase() {
    process.database = level('./database')
    log('Connected to database')
}

function log(message, level) {

    // If no level provided, default to info
    if (!level) return console.log(colors.blue.bold('[Info]') + ' > '.yellow + message)

    switch (level.toUpperCase()) {
        case 'ERROR':
            console.log(colors.red.bold('[Error]') + ' > '.yellow + message)
            break;

        case 'WARN':
            console.log(colors.yellow.bold('[Warning]') + ' > '.yellow + message)
            break;

        case 'INFO':
            console.log(colors.blue.bold('[Info]') + ' > '.yellow + message)
            break;

        default:
            log(`Invalid log level "${level}". Original message: ${message}`, 'ERROR')
            break;
    }
}

module.exports = {
    client
}