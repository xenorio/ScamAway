const colors = require('colors')

module.exports = async(client) => {

    process.log('Logged in and ready to rumble!')

    process.log(`Invite link: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1393717275718&scope=bot%20applications.commands`)

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