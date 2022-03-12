const fs = require('fs');

module.exports = (client) => {
    client.on('message', (channel, user, msg, IsSelf) => {
        client.logger(`<${user.username}>: ${msg}`);
        
        if (user['message-type'] !== "chat") return;
        
        if (msg.toLowerCase().includes(" followers, primes and viewers on ")) {
            return client.ban(channel, user.username, "Bot Advertisement.");
        }
        
        var prefixes = client.config.prefixes;
        const prefixRegex = new RegExp(`^${prefixes.join('|^')}`);
        if (!prefixRegex.test(msg)) return;
        const [prefix, matchedPrefix] = msg.match(prefixRegex);
        const args = msg.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (user.username == 'tawan475') {
            if (command === 'eval') try { client.say(channel, "Successful Evaluation: " + eval(msg.split(" ").splice(1).join(" "))) } catch (error) { console.error(error.toString(), "error"); client.say(channel, error.toString()) };
            if (command === 'reload' || command === 'restart') client.say(channel, "Restarting...").then(() => process.exit(0));
        }

        var rCommand = client.commands[command] ||
            client.commands[Object.keys(client.commands)
                .filter(cmd => client.commands[cmd].aliases &&
                    client.commands[cmd].aliases.includes(command))];

        if (!rCommand || rCommand.length) return;
        let fileHASH = client.HASH(fs.readFileSync(rCommand.filePath));
        if (rCommand.HASH !== fileHASH) 
            client[rCommand.folder][rCommand.filename] = require(rCommand.filePath)

        rCommand.execute(channel, user, msg, IsSelf, args);

    });
    
    return module;
}