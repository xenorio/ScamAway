module.exports = {

    // Bot application token
    // Create an application at https://discord.com/developers/applications
    token: '',

    // Presence data
    //
    // Activity types:
    // 0 - Playing
    // 1 - Streaming
    // 2 - Listening
    // 3 - Watching
    presence: {
        status: 'online',
        activities: [{
            name: 'The Anti-Phishing Bot',
            type: 3
        }]
    },

    // API endpoint
    api: 'https://scamaway.xenorio.xyz/api',

    // Identifier for the API. Needs to be set if you're using scamaway.xenorio.xyz
    // This may be your website, GitHub profile, Discord guild, something along those lines
    identifier: "null",

    // Interval for refreshing the whitelist
    whitelistRefresh: '5m',



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