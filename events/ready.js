// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const colors = require('colors')
const { log } = require('../util/util')
const commands = require('../util/commands')

module.exports = async (client) => {
    
    commands.load(client)

    log('Logged in and ready to rumble!')

    log(`Invite link: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1394254146630&scope=bot%20applications.commands`)

    // Load unknown guilds
    client.guilds.forEach(guild => {
        process.database.get(guild.id)
            .catch(() => {
                log(`Adding unknown guild ${colors.bold(guild.name)} to database`)
                process.database.put(guild.id, JSON.stringify({
                    action: 'delete',
                    everyoneDetection: false
                }))
            })
    })


};