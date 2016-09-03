/**
 * index.spec.js
 */

const fs = require('fs');
const path = require('path');
const app = require('./index');
const winston = require('winston');

const convert = (imagePath, type, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                reject(err);
            }
            const result = app.filter(imageBuffer, type, options);
            resolve(result);
        });
    });
};

const imagePath = path.join(__dirname + '/../demo/img/sample.jpg');
convert(imagePath, 'horizontalflip', {})
    .then(result => {
        winston.info(result);
    })
    .catch(err => {
        winston.error(err);
    });
