const fs = require('fs');

module.exports = (client) => {
    client.on('redeem', async (channel, username, reward, user, msg) => {

        switch(reward) {
            case "3bf30eda-e754-4f88-96ac-d22472f3dec1": // 1
                module.addCredit(channel, user, 1)
            break;
            case "552eee3c-9b82-45d2-8ebb-4346a8fdb9c6": // 5
                module.addCredit(channel, user, 5)
            break;
            case "dfcaf8b0-e336-4ca5-a9e0-ad83e49761e5": // 10
                module.addCredit(channel, user, 10)
            break;
            case "2f054568-133f-4820-b5c8-03b2aa8148da": // 50
                module.addCredit(channel, user, 50)
            break;
            case "a1583f0d-2269-454a-ad5f-90a4b58e26a0": // 100
                module.addCredit(channel, user, 100)
            break;

        }
    });
    
    module.addCredit = async function addCredit(channel, user, creditAmount) {
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

        credit.totalRedeem+= creditAmount*100;
        credit.totalCredit+= creditAmount * multiplier;
        credit.credit+= creditAmount * multiplier;
        
        await client.db.set("credit", user.username, credit);
        client.logger(`${user.username} Redeemed ${creditAmount} credits! +${creditAmount * multiplier}${user.subscriber?" (x1.5 For being subbed!)":""} credits!`);
        let message = `${user.username}: +${creditAmount * multiplier}${user.subscriber?" (x1.5 For being subbed)":""} credits!`;
        client.say(channel, message);
    }

    return module;
}