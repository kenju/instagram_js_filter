/**
 * index.spec.js
 */

const fs = require('fs');
const path = require('path');
const app = require('./index');

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
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });
