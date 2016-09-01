/**
 * server.js
 */

const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const corser = require('corser');

const routes = require('../routes/routes');


const setupServer = (app) => {
    return new Promise(resolve => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        // TODO:
        app.use(morgan('dev'));
        app.use(helmet());
        app.use(corser.create());
        resolve(app);
    });
};

const runServer = (app, PORT) => {
    app.listen(PORT, () => {
        winston.info('Server is listening on port %d in %s mode.', PORT, app.settings.env);
        routes(app);
    });
};

const init = () => {
    const PORT = '3030';
    const app = express();
    setupServer(app)
        .then(app => {
            runServer(app, PORT);
        })
        .catch(error => {
            winston.error(error);
        });

};

module.exports = {
    init
};
