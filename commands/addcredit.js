module.exports = (client) => {
    module.aliases = ['addc', 'addcredits'];
    module.cooldown = 0;

    module.execute = async function execute(channel, user, msg, IsSelf, args) {
        if (user.username !== "tawan475") return client.say(channel, `${user.username}, You are not allowed to use this command.`);
        let amount = args[1] || args[0];
        let toCheck = args[0].toLowerCase();

        if (amount === toCheck){
            amount == args[0];
            toCheck = user.username.toLowerCase();
        }

        amount = parseInt(amount);

        console.log(toCheck)
        if (!amount || isNaN(amount)) return client.say(channel, `${user.username}, You need to specify an amount of credits to add.`);

        let credit = await client.db.get("credit", toCheck);

        module.addBonusCredit(channel, toCheck, amount);
    }

    module.addBonusCredit = async function addBonusCredit(channel, username, creditAmount) {
        let credit = await client.db.get("credit", username);
        if (!credit) {
            credit = {
                username: username,
                totalBit: 0,
                totalCredit: 0,
                totalRedeem: 0,
                credit: 0
            }
        }

        if (!credit.totalBonus) credit.totalBonus = 0;
        credit.totalBonus+= creditAmount;
        credit.totalCredit+= creditAmount;
        credit.credit+= creditAmount;
        
        await client.db.set("credit", username, credit);
        client.logger(`${username} Redeemed ${creditAmount} credits! +${creditAmount} credits!`);
        let message = `${username}: +${creditAmount} credits!`;
        client.say(channel, message);
    }

    return module;
}