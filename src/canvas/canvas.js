/**
 * canvas.js
 */
const path = require('path');
const fs = require('fs');
const Canvas = require('canvas');
const Image = Canvas.Image;
const filter = require('../filter/filter');

const filterWithType = (type, imageData) => {
    switch (type.toLowerCase()) {
        case 'lark':
            return filter.lark(imageData);
        case 'reyes':
            return filter.reyes(imageData);
        case 'juno':
            return filter.juno(imageData);
        case 'slumber':
            return filter.slumber(imageData);
        case 'crema':
            return filter.crema(imageData);
        case 'ludwig':
            return filter.ludwig(imageData);
        case 'aden':
            return filter.aden(imageData);
        case 'perpetua':
            return filter.perpetua(imageData);
        case 'amaro':
            return filter.amaro(imageData);
        case 'mayfair':
            return filter.mayfair(imageData);
        case 'rise':
            return filter.rise(imageData);
        case 'hudson':
            return filter.hudson(imageData);
        case 'valencia':
            return filter.valencia(imageData);
        case 'xpro2':
            return filter.xpro2(imageData);
        case 'sierra':
            return filter.sierra(imageData);
        case 'willow':
            return filter.willow(imageData);
        case 'lofi':
            return filter.lofi(imageData);
        case 'earlybird':
            return filter.earlybird(imageData);
        case 'brannan':
            return filter.brannan(imageData);
        case 'inkwell':
            return filter.inkwell(imageData);
        case 'hefe':
            return filter.hefe(imageData);
        case 'nashville':
            return filter.nashville(imageData);
        case 'sutro':
            return filter.sutro(imageData);
        case 'toaster':
            return filter.toaster(imageData);
        case 'walden':
            return filter.walden(imageData);
        case 'nineteenseventyseven':
        case '1977':
            return filter.nineteenSeventySeven(imageData);
        case 'kelvin':
            return filter.kelvin(imageData);
        case 'enhance':
            return filter.enhance(imageData);
        case 'grayscale':
            return filter.grayscale(imageData);
        case 'sepia':
            return filter.sepia(imageData);
        case 'luminance':
            return filter.luminance(imageData);
        case 'opacity':
            return filter.opacity(imageData, 0.5);
        case 'brighten':
            return filter.brighten(imageData, 50);
        case 'darken':
            return filter.darken(imageData, 50);
        case 'threshold':
            return filter.threshold(imageData);
        case 'negaposi':
            return filter.negaposi(imageData);
        case 'brightnesscontrast':
            return filter.brightnessContrast(imageData, -0.08, 1.5);
        case 'huerotate':
            return filter.hueRotate(imageData, 45);
        case 'saturate':
            return filter.saturate(imageData, 20);
        case 'horizontalflip':
            return filter.horizontalFlip(imageData);
        case 'verticalflip':
            return filter.verticalFlip(imageData);
        case 'doubleflip':
            return filter.doubleFlip(imageData);
        case 'horizontalmirror':
            return filter.horizontalMirror(imageData);
        case 'verticalmirror':
            return filter.verticalMirror(imageData);
        case 'xymirror':
            return filter.XYMirror(imageData);
        default:
            return filter.grayscale(imageData);
    }
};

const getBase64 = (canvas) => {
    return canvas.toDataURL().split(',')[1];
};

const saveCanvas = (canvas, filename) => {
    const canvasBase64 = getBase64(canvas);
    const buffer = new Buffer(canvasBase64, 'base64');
    const outPath = path.join(__dirname + '/../../dist/img/' + filename);
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(outPath);
        })
    });
};

const convert = (type, url) => {
    return new Promise((resolve, reject) => {
        const imagePath = url ? url : path.join(__dirname + '/../../demo/img/sample.jpg');
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const image = new Image;
            image.src = data;

            const canvas = new Canvas(image.width, image.height);
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            filterWithType(type, imageData)
                .then(newImageData => {
                    context.putImageData(newImageData, 0, 0);
                    return getBase64(canvas);
                })
                .then(savedPath => {
                    resolve(savedPath);
                })
                .catch(err => {
                    reject(err);
                });
        });
    });
};

module.exports = {
    convert
};