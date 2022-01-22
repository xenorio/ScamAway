module.exports = {

    // Bot application token
    // Create an application at https://discord.com/developers/applications
    token: '',

    // Presence data
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'The Anti-Phishing Bot',
            type: 'WATCHING'
        }]
    },

    // API endpoint
    api: 'https://scamaway.xenorio.xyz/api',



    // +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
    // | Everything beyond this point is only used if you host the API yourself. If you use the public API, don't worry about this! |
    // |                                       https://github.com/Xenorio/ScamAway-API                                              |
    // +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

    // API key
    // Used for administrative actions, such as adding domains to the database
    apiKey: '',

    // Dev Discord guild ID
    // Only administrators of this guild are allowed to use administrative commands
    devGuild: ''

}