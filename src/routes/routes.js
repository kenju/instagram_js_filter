/**
 * routes.js
 */

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
    app.all('/:obj_type/*?', (req, res, next) => {
        res.contentType('json');
        next();
    });

    app.get('/:obj_type', (req, res) => {
        const objType = getObjType(req);
        sendResponse(200, res, {
            data: objType
        });
    });

    app.post('/:obj_type', (req, res) => {
        const objType = getObjType(req);
        const objMap = getObjMap(req);
        // TODO: validate
        canvas.convert(objMap.type)
            .then(result => {
                sendResponse(200, res, {
                    endpoint: objType,
                    data: objMap,
                    result
                });
            })
            .catch(err => {
                sendErrorResponse(req, res, err, 500);
            });
    });
};

module.exports = (app) => {
    configRoutes(app);
};
