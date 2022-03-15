module.exports = (client) => {
    module.aliases = ['tournament', 'tour'];
    module.cooldown = 3000;

    module.execute = function execute(channel, user, msg, IsSelf, args) {
        client.say(channel, `Register: https://forms.gle/acBVMpc6oJrLfRhw6, Main Sheet: https://go.tawan475.dev/Tz9o50c4`);
    }

    return module;
}