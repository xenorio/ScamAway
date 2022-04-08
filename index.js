// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const Eris = require('eris')
const fs = require('fs')
const colors = require('colors')
const level = require('level')
const fetch = require('cross-fetch')

const { log } = require('./util/util')

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
var client

init()

async function init() {

    await loadConfig()
    await loadDatabase()

    // Create bot client
    client = new Eris.CommandClient(config.token, {
        intents: ["guilds", "guildMessages"]
    })

    client.editStatus(config.presence.status, config.presence.activities)

    await loadEvents()

    // Login
    await client.connect()
        .catch(err => {
            log('Unable to log in. Please check the bot token.\nMessage from Discord: ' + err.message, 'ERROR')
            process.exit()
        })

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

    // Check for errors with API requests
    let res = await fetch(config.api + '/check?domain=scamawaytest.com', {
        headers: {
            'X-Identity': config.identifier
        }
    })
    let data = await res.json()

    if (data.error) {
        log(`API Error: ${data.error}`, 'ERROR')
        if (data.error == 'Please provide identification using the X-Identity header') {
            log('Note: This refers to the "identifier" config entry')
        }
        process.exit()
    }

}

async function loadEvents() {

    log('Loading events')

    // Get all file names in events dir
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

module.exports = {
    client
}