const colors = require('colors')

module.exports = async(client) => {

    process.log('Logged in and ready to rumble!')

    // Load unknown guilds
    client.guilds.fetch()
        .then(guilds => {
            guilds.forEach(guild => {
                client.db.get(guild.id)
                    .catch(() => {
                        process.log(`Adding unknown guild ${colors.bold(guild.name)} to database`)
                        client.db.put(guild.id, JSON.stringify({
                            action: 'delete',
                            everyoneDetection: false
                        }))
                    })
            })
        })

};