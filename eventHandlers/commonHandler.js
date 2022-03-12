const fs = require('fs');

module.exports = (client) => {
    client.on("connected", (add, port) => {
        client.logger("Logged In!");
        client.say("#tawan475", `Bot Connected!`);
    });
    
    return module;
}