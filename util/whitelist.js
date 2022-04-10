// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const fetch = require('cross-fetch')
const config = require('../config')
const { log } = require('./util')

let whitelist = []

module.exports.load = async() => {
    let res = await fetch(config.api + '/whitelist', {
        method: 'GET',
        headers: {
            'X-Identity': config.identifier
        }
    })
    whitelist = await res.json()
    log('Loaded whitelist')
}

module.exports.check = (domain) => {
    return whitelist.find(x => domain == x.domain || domain.endsWith('.' + x.domain))
}