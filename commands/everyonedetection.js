// Copyright (C) 2022  Marcus Huber (Xenorio)

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }
    interaction.createMessage({
        flags: Constants.MessageFlags.EPHEMERAL,
        content: 'This automatically detects messages that contain an unauthorized @everyone and at least 1 link.\nLinks are automatically being reported.',
        components: [{
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [{
                custom_id: 'everyonedetection-command-menu',
                type: Constants.ComponentTypes.SELECT_MENU,
                options: [{
                        label: 'Enable',
                        description: 'Enables @everyone detection',
                        value: 'enable'
                    },
                    {
                        label: 'Disable',
                        description: 'Disables @everyone detection',
                        value: 'disable'
                    }
                ]
            }]
        }]
    })
}

module.exports.options = {
    name: 'everyonedetection',
    description: 'Choose what happens when an unauthorized @everyone is detected'
}