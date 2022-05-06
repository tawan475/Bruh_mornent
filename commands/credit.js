module.exports = (client) => {
    module.aliases = ['c','credits'];
    module.cooldown = 3000;

    module.execute = async function execute(channel, user, msg, IsSelf, args) {
        let toCheck = args[0] || user.username;

        let credit = await client.db.get("credit", toCheck);
        if (!credit) return client.say(channel, `${user.username}, No data for ${toCheck}.`);
        if (credit.credit == 0) return client.say(channel, `${toCheck}, You have 0 credits, send bits to get more credits! For more infomation: !help`);
        return client.say(channel, `${user.username === toCheck ? user.username + ", You" : user.username + ", " + toCheck} have ${credit.credit} credits.`);
    }

    return module;
}