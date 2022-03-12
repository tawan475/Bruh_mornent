const fs = require('fs');

module.exports = (client) => {
    client.on('cheer', async (channel, user, msg) => {
        var bitsAmount = parseInt(user.bits);

        let credit = await client.db.get("credit", user.username);
        if (!credit) {
            credit = {
                username: user.username,
                totalBit: 0,
                totalCredit: 0,
                totalRedeem: 0,
                credit: 0
            }
        }

        var multiplier = user.subscriber ? 1.5 : 1.0;

        credit.totalBit+= bitsAmount;
        credit.totalCredit+= bitsAmount * multiplier;
        credit.credit+= bitsAmount * multiplier;
        
        await client.db.set("credit", user.username, credit);
        client.logger(`${user.username} Cheered ${user.bits} bits! +${bitsAmount * multiplier}${user.subscriber?" (x1.5 For being subbed!)":""} credits!`);
        let message = `${user.username}: +${bitsAmount * multiplier}${user.subscriber?" (x1.5 For being subbed)":""} credits!`;
        client.say(channel, message);
    });
    
    return module;
}