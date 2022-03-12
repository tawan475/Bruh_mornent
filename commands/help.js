module.exports = (client) => {
    module.aliases = ['h'];
    module.cooldown = 3000;

    module.execute = function execute(channel, user, msg, IsSelf, args) {
        client.say(channel, `List of command and usage: https://go.tawan475.dev/eaTXpoG_.png`);
    }

    return module;
}