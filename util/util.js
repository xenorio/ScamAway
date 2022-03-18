// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const colors = require('colors')
const fs = require('fs')

module.exports.log = (message, level) => {

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

module.exports.createLogHook = async(channel, cb) => {

    let avatar = fs.readFileSync('./logo.png').toString('base64')

    channel.createWebhook({
            avatar: `data:image/png;base64,${avatar}`,
            name: `ScamAway`
        }, `ScamAway Log`)
        .then(hook => {
            cb(`https://discord.com/api/webhooks/${hook.id}/${hook.token}`)
        })
        .catch(err => { return })

}

module.exports.getSettings = async(guildId) => {
    return JSON.parse(await process.database.get(guildId))
}

module.exports.setSettings = (guildId, settings) => {
    process.database.put(guildId, JSON.stringify(settings))
}