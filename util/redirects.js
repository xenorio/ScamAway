// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const axios = require('axios').default
const config = require('../config')

module.exports.resolve = async(url) => {

    let redirects = []

    let count = 0

    // Recursively check for redirects and add hostnames to list
    let check = async(currentUrl) => {
        let res = await axios({
            method: 'GET',
            url: currentUrl,
            headers: {
                'User-Agent': config.followRedirects.useragent
            },
            maxRedirects: 0,
            validateStatus: function() { // Ignore response codes
                return true
            }
        }).catch(err => { return })

        if (res && res.status >= 300 && res.status < 400) {

            let relative = false

            try {
                redirects.push((new URL(res.headers['location'])).hostname)
            } catch (error) {
                relative = true
            }

            count += 1
            if (count > config.followRedirects.maxRedirects) return

            let nextUrl = res.headers['location']

            if (relative) {
                nextUrl = (new URL(currentUrl)).hostname + nextUrl
            }

            await check(nextUrl)
        }

    }

    await check(url)

    return redirects

}