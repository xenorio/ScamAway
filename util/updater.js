// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const fs = require('fs')

let currentConfig = require('../config')
let defaultConfig = require('../config.default')

let configModified = false

// Merge new config entries
for (let field in defaultConfig) {
    let value = defaultConfig[field]
    if (!currentConfig[field]) {
        console.log(`Adding "${field}" config entry...`)
        currentConfig[field] = value
        configModified = true
    }
}

// Save modified config
if (configModified) {
    console.log(`The configuration has been modified!`)
    fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(currentConfig, null, 2)}`)
}