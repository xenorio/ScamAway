<p align="center"><img src="./logo.png" alt="Logo" width="100"></p>

# ScamAway
The Anti-Phishing Discord Bot

## Archival Notice
As Discord has now finally taken the decision of disabling my main account for no reason whatsoever, I have decided to step away from it completely.
This includes not developing any software for it anymore. 

You can still use ScamAway if you host both the bot and the API yourself, it will just not get any further updates whatsoever, not even security related

Feel free to fork the project and keep developing it!

## What's this?
ScamAway is a Discord bot that aims to keep your servers free from annoying phishing links by detecting known domains, and has other related features

Looking for the API behind this? Head to https://github.com/Xenorio/ScamAway-API

## Features
- Automatic detection of malicious links
- Redirection following (URL shorteners etc)
- Detect Discord login QR codes
- Choose what happens when a message is detected (delete, kick, ban)
- Report URLs
- Detect unauthorized @everyone mentions
- Fully selfhostable!

## Setup
- Install [Node.JS](https://nodejs.org)
- Clone the repository
- Install dependencies with ``npm install``
- Set your bot token in ``config.default.js``
- Start the bot with ``npm start``

### Updating
By executing ``npm run update`` you can automatically pull the GitHub repo, install new dependencies, and merge new config entries all at the same time.

## Support
For support and general talk about this project, head to the [Discord server](https://discord.xenorio.xyz)

## Contributing
If you want to contribute, please use the ``dev`` branch as upstream

## Donate
You can support this project on [LiberaPay](https://liberapay.com/Xenorio)

## Credits
Projects being used:
- [Eris](https://github.com/abalabahaha/eris)
- [Colors.JS](https://github.com/Marak/colors.js)
- [extract-urls](https://github.com/huckbit/extract-urls)
- [cross-fetch](https://github.com/lquixada/cross-fetch)
- [LevelDB](https://github.com/Level/level)
- [ms](https://github.com/vercel/ms)
- [jimp](https://github.com/oliver-moran/jimp)
- [jsqrcode](https://github.com/edi9999/jsqrcode)

External API:
- [phish.sinking.yachts](https://phish.sinking.yachts/docs)

Logo:
- [Pirate flag icon by Delapouite](https://game-icons.net/1x1/delapouite/pirate-flag.html) (CC BY 3.0)
- [Templar shield icon by Delapouite](https://game-icons.net/1x1/delapouite/templar-shield.html) (CC BY 3.0)
