process.on('uncaughtException', function (exception) {
    console.error(exception);
});
require('dotenv').config();

const tmi = require('tmi.js');
const path = require('path');
const fs = require('fs');

const client = new tmi.Client({
    options: { debug: false },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [ "tawan475" ]
});
client.db = require('./libs/db.js')();

require('./libs/globalFunction.js')(client);
require('./libs/webserver.js')({ client });

client.connect();

require('./libs/loader.js')(client, [
    path.join(__dirname, './eventHandlers'),
    path.join(__dirname, './commands')
]);
