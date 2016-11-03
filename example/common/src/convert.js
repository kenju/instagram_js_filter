const fs = require('fs');
const path = require('path');
const Filter = require('../../../src/index');
const filter = new Filter();

const convert = (imagePath, effect, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                reject(err);
            }
            const result = filter.apply(imageBuffer, effect, options);
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

let args = [];
process.argv.forEach((val, index) => {
    if(index > 1) {
        args.push(val);
    }
});

const imagePath = path.join(__dirname + '/../image/sample.jpg');
const effects = args.length > 0 ? args : filter.getSupportedEffects();
effects.forEach(effect => {
    convert(imagePath, effect, {})
        .then(base64 => {
            const buffer = new Buffer(base64, 'base64');
            const outPath = path.join(__dirname + '/../out/' + effect + '.out.jpg');
            return saveFile(outPath, buffer);
        })
        .then(savedPath => {
            console.log(savedPath);
        })
        .catch(err => {
            console.log(err);
        });
});
