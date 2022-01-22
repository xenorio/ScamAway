const colors = require('colors')

module.exports = async(client, guild) => {

    process.log(`Added to guild ${colors.bold(guild.name)} | ${colors.bold(guild.id)}`)

    client.db.put(guild.id, JSON.stringify({
        action: 'delete'
    }))

};