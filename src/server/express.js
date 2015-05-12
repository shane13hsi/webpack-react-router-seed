/*eslint-disable no-console */

import compression from 'compression';
import config from './config';
import express from 'express';
// import favicon from 'serve-favicon';
import path from 'path';

export default function() {

    const app = express();

    app.use(compression());
    // TODO: Add favicon.
    // app.use(favicon('assets/img/favicon.ico'))
    // TODO: Move to CDN.
    app.use('/build', express.static('build'));
    app.use('/assets', express.static('assets'));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    });

    app.listen(config.port);

    console.log(`App started on port ${config.port}`);
}
