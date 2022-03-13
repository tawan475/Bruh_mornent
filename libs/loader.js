const fs = require('fs');

module.exports = (client, paths = []) => {
    paths.forEach(path => {
        let arr = path.split("\\");
        let folder = arr[arr.length - 1];
        client[folder] = {};

        let commandFile = fs.readdirSync(path).filter(file => file.endsWith(".js"));
        for (const file of commandFile) {
            const filePath = path + "/" + file;
            const toLoad = require(filePath)(client);
            let filename = file.replace(/\.js$/, "");

            let fileHASH = client.HASH(fs.readFileSync(filePath));

            toLoad.filePath = filePath;
            toLoad.folder = folder;
            toLoad.filename = filename;
            toLoad.HASH = fileHASH;

            client[folder][filename] = toLoad;
            client.logger(`Loaded ./${folder}/${filename}.js`);
        }
    });
}