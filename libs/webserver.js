module.exports = ({ client }) => {
    
    const express = require('express');
    const compression = require('compression');
    const bodyParser = require('body-parser');
    const socketIO = require('socket.io');
    
    client.app = express();
    const app = client.app;
    app.client = client
    
    const server = require('http').createServer(app);
    
    app.io = new socketIO.Server(server);
    const io = app.io
    
    app.logger = client.logger

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(require('express-minify-html-2')({
        override: true,
        exception_url: [
            function () {
                return true
            }
        ],
        htmlMinifier: {
            caseSensitive: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            minifyJS: true,
            trimCustomFragments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            html5: true,
            decodeEntities: true,
            minifyCSS: true,
            processConditionalComments: true,
            removeAttributeQuotes: true,
            useShortDoctype: true,
            removeStyleLinkTypeAttributes: true
        }
    }));

    app.use((req, res, next) => {
        let log = `h:${req.get('host')} o:${req.get('origin') ? req.get('origin') : "direct"} ${req.connection.remoteAddress} ${req.method}:${req.url} code:${res.statusCode}`;
        client.logger(log)
        res.setHeader('X-Powered-By', 'tawan475');
        next()
    });

    app.use(compression());
    app.disable('x-powered-by')
    app.set("view engine", "ejs");


    require('./router')({ app });

    app.use(function (req, res, next) {
        res.status(404).send("404,  Not Found.");
    });

    server.listen(8888, () => {
        app.logger(`listening at HTTP`)
    });
}