process.on('uncaughtException', function (exception) {
    console.error(exception);
});
require('dotenv').config();

const tmi = require('tmi.js');
const fs = require("fs");

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
client.db = require('./db.js')();

require('./globalFunction.js')(client);

require('./webserver.js')({ client });

client.connect();

require('./loader.js')(client, [
    './eventHandlers',
    './commands'
]);
