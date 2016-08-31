/**
 * index.js
 */

const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./routes/routes');


const setupServer = (app) => {
    return new Promise(resolve => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        // TODO:
        app.use(morgan('dev'));
        app.use(helmet());
        resolve(app);
    });
};

const runServer = (app, PORT) => {
    app.listen(PORT, () => {
        winston.info('Server is listening on port %d in %s mode.', PORT, app.settings.env);
        routes(app);
    });
};


const PORT = '3030';
const app = express();
setupServer(app)
    .then(app => {
        runServer(app, PORT);
    })
    .catch(error => {
        winston.error(error);
    });

