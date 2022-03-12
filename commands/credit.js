module.exports = (client) => {
    module.aliases = ['c','credits'];
    module.cooldown = 3000;

    module.execute = async function execute(channel, user, msg, IsSelf, args) {
        let credit = await client.db.get("credit", user.username);
        if (!credit || credit.credit == 0) return client.say(channel, `${user.username}, You have 0 credits, send bits to get more credits! For more infomation: !help`);
        return client.say(channel, `${user.username}, You have ${credit.credit} credits. For more infomation: !help`);
    }

    return module;
}