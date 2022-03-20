const ytdl = require('ytdl-core');
module.exports = (client) => {
    module.aliases = [];
    module.cooldown = 3000;

    module.execute = async function execute(channel, user, msg, IsSelf, args) {
        if (!args || !args.length || !args[0]) return client.say(channel, `${user.username}, Malformed command. try refer to !help`)
        let credit = await client.db.get("credit", user.username);
        if (!credit || !credit.credit) return client.say(channel, `${user.username}, You do not have any credits, try !credit`);

        var YTUrl = args[0];
        if (!ytdl.validateID(YTUrl) && !ytdl.validateURL(YTUrl)) return client.say(channel, `${user.username}, Not a valid youtube URL/VideoId.`);

        let startAt = 0
        if (args[2] && (!isNaN(args[2]) && !isNaN(parseInt(args[2])) ) ) startAt = parseInt(args[2]);

        let video = await ytdl.getInfo(args[0]);
        let details = video.videoDetails;
        let videoTitle = details.title;
        let videoLength = details.lengthSeconds;

        let playlength = parseInt(videoLength);
        if (args[1] && (!isNaN(args[1]) && !isNaN(parseInt(args[1])) ) ) playlength = parseInt(args[1]);        
        if (Math.floor(credit.credit/10) < playlength) {
            if (args[1]) return client.say(channel, `${user.username}, You dont have enuogh credits to play the entire video.`);
            if (!args[1]) playlength = Math.floor(credit.credit/10);
        }
        
        if (playlength <= 0 || playlength > videoLength || startAt < 0 || startAt >= videoLength) return client.say(channel, `${user.username}, Malformed command. try refer to !help`);

        let videoId = details.videoId;

        if (details.isPrivate || 
            details.age_restricted || 
            details.isLive || 
            details.isLiveContent || 
            details.isLowLatencyLiveStream || 
            !details.isFamilySafe) return client.say(channel, `${user.username}, Could not play that video, maybe it's private, is live, or is not family friendly.`);

        credit.credit -= playlength*10;
        await client.db.set("credit", user.username, credit);
        
        let mediashare = {
            videoId: videoId,
            startSeconds: startAt,
            endSeconds: startAt + playlength,
            videoTitle: videoTitle,
            requestor: user.username,
            credits: playlength*10
        };
        
        client.logger('emitting mediashare')
        client.app.io.emit('mediashare', mediashare);
        client.say(channel, `${user.username}, Your video have been added to the queue!`);
    }

    return module;
}