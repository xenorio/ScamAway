// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

module.exports.createLogHook = async(channel, cb) => {

    channel.createWebhook(`ScamAway`, {
            avatar: `https://github.com/Xenorio/ScamAway/raw/main/logo.png`,
            reason: `ScamAway Log`
        })
        .then(hook => {
            cb(hook.url)
        })
        .catch(err => { return })

}

module.exports.getSettings = async(guildId) => {
    return JSON.parse(await process.database.get(guildId))
}

module.exports.setSettings = (guildId, settings) => {
    process.database.put(guildId, JSON.stringify(settings))
}