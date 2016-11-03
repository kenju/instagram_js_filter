const fs = require('fs');
const path = require('path');
const Filter = require('../../../src/index');
const filter = new Filter();

const convert = (imagePath, type, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                reject(err);
            }
            const result = filter.apply(imageBuffer, type, options);
            resolve(result);
        });
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

const imagePath = path.join(__dirname + '/../image/sample.jpg');
const type = 'kelvin';
convert(imagePath, type, {})
    .then(base64 => {
        const buffer = new Buffer(base64, 'base64');
        const outPath = path.join(__dirname + '/../out/' + type + '.out.jpg');
        return saveFile(outPath, buffer);
    })
    .then(savedPath => {
        console.log(savedPath);
    })
    .catch(err => {
        console.log(err);
    });
