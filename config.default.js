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

    followRedirects: {

        // Whether redirects should be followed (URL shorteners etc)
        // Be careful! This will send a http request to EVERY link the bot sees! If you do not understand what that entails, leave this disabled!
        enabled: false,

        // The user agent to use for sending requests. Should be set to a common webbrowser UA.
        // Default: Google Chrome 87 on Microsoft Windows
        useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',

        // The maximum length a redirect chain can have before the bot gives up on it
        maxRedirects: 15

    },



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