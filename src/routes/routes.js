/**
 * routes.js
 */

const winston = require('winston');
const canvas = require('../canvas/canvas');

const sendErrorResponse = (req, res, error, statusCode) => {
    const errorMessage = {
        statusCode,
        error,
        info: req.protocol + '://' + req.get('host') + '/doc'
    };
    return res.status(statusCode || 500)
        .type('application/json')
        .json(errorMessage);
};

const sendResponse = (status, res, data) => {
    return res.status(status)
        .type('application/json')
        .json(data);
};

const getObjType = (req) => {
    return req.params.obj_type;
};

const getObjMap = (req) => {
    return req.body;
};

const configRoutes = (app) => {
    // TODO: validate
    app.all('/:obj_type/*?', (req, res, next) => {
        res.contentType('json');
        next();
    });

    app.get('/:obj_type', (req, res) => {
        const objType = getObjType(req);
        sendResponse(200, res, {
            endpoint: objType
        });
    });

    app.post('/:obj_type', (req, res) => {
        const objType = getObjType(req);
        const objMap = getObjMap(req);
        canvas.convert(objMap.type)
            .then(convertedFilePath => {
                const options = {
                    dotfiles: 'deny',
                    headers: {
                        'x-instaimage-timestamp': Date.now(),
                        'x-instaimage-sent': true
                    }
                };
                return res.sendFile(convertedFilePath, options);
            })
            .then(result => {
                winston.info(result);
            })
            .catch(err => {
                // TODO: do not responsd err in production
                sendErrorResponse(req, res, err, 500);
            });
    });
};

module.exports = (app) => {
    configRoutes(app);
};
