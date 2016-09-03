/**
 * index.spec.js
 */

const fs = require('fs');
const path = require('path');
const request = require('request');
const winston = require('winston');
const app = require('../src/adapter/adapter');

const convert = (buffer, type, options) => {
    return new Promise(resolve => {
        const result = app.filter(buffer, type, options);
        resolve(result);
    });
};

const saveFile = (outPath, buffer) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(outPath);
        });
    });
};

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, imageBuffer) => {
            if (err) {
                reject(err);
            }
            resolve(imageBuffer);
        });
    });
};

const download = (uri, filePath) => {
    return new Promise(resolve => {
        request.get(uri)
            .pipe(fs.createWriteStream(filePath))
            .on('close', () => {
                resolve(filePath);
            });
    });
};

const uri = 'https://raw.githubusercontent.com/kenju/instagram_js_filter/master/demo/img/sample.jpg';
const outPath = path.join(__dirname + '/../dist/img/sample-online-converted.jpg');
download(uri, outPath)
    .then(downloadedFile => {
        winston.info(downloadedFile);
        return readFile(downloadedFile);
    })
    .then(fileBuffer => {
        return convert(fileBuffer, 'verticalflip', {});
    })
    .then(base64 => {
        const buffer = new Buffer(base64, 'base64');
        return saveFile(outPath, buffer);
    })
    .then(savedPath => {
        winston.info(savedPath);
    })
    .catch(err => {
        winston.error(err);
    });
