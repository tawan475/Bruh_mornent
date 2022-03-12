const fs = require('fs');
const crypto = require('crypto');

module.exports = (client) => {
    client.config = require("./config.json");

    client.logger = function logger(msg) {
        let logMessage = `[${new Date().getTime()}] ${msg}`;
        fs.appendFileSync("./log.log", logMessage + "\r\n");
        console.log(logMessage);
    }

    client.HASH = function HASH(string) {
        return crypto.createHash("sha256")
            .update(string)
            .digest('hex');
    }
}