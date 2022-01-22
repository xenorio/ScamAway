const fetch = require('cross-fetch')
const config = require('../config.js')
const colors = require('colors')
const extractUrls = require("extract-urls");

module.exports = async(client, message) => {

    let URLs = extractUrls(message.content, true)
    if (URLs) {
        for (let url of URLs) {

            let domain = (new URL(url)).hostname

            let response = await fetch(config.api + `/check?domain=${domain}`, {
                method: 'GET'
            })
            let body = await response.json()

            if (body.blocked) {
                message.delete()
                process.log('Deleted message containing ' + colors.bold(domain))
                return
            }

        }
    }

};