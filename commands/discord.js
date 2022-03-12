module.exports = (client) => {
    module.aliases = [''];
    module.cooldown = 3000;

    module.execute = function execute(channel, user, msg, IsSelf, args) {
        client.say(channel, `${user.username}, https://discord.gg/UnTNmWZ3jP`);
    }

    return module;
}