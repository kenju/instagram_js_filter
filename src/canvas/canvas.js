/**
 * canvas.js
 */
const path = require('path');
const fs = require('fs');
const Canvas = require('canvas');
const Image = Canvas.Image;
const filter = require('../filter/filter');

const saveCanvas = (canvas, filename) => {
    const canvasBase64 = canvas.toDataURL().split(',')[1];
    const buffer = new Buffer(canvasBase64, 'base64');
    const outPath = path.join(__dirname + '/../../dist/img/' + filename);
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(outPath + ' saved.');
        })
    });
};

const filterWithType = (type, imageData) => {
    switch (type) {
        /*
         case 'lark':
         return filter.lark(pix);
         case 'reyes':
         return filter.reyes(pix);
         case 'juno':
         return filter.juno(pix);
         case 'slumber':
         return filter.slumber(pix);
         case 'crema':
         return filter.crema(pix);
         case 'ludwig':
         return filter.ludwig(pix);
         case 'aden':
         return filter.aden(pix);
         case 'perpetua':
         return filter.perpetua(pix);
         case 'amaro':
         return filter.amaro(pix);
         case 'mayfair':
         return filter.mayfair(pix);
         case 'rise':
         return filter.rise(pix);
         case 'hudson':
         return filter.hudson(pix);
         case 'valencia':
         return filter.valencia(pix);
         case 'xpro2':
         return filter.xpro2(pix);
         case 'sierra':
         return filter.sierra(pix);
         case 'willow':
         return filter.willow(pix);
         case 'lofi':
         return filter.lofi(pix);
         case 'earlybird':
         return filter.earlybird(pix);
         case 'brannan':
         return filter.brannan(pix);
         case 'inkwell':
         return filter.inkwell(pix);
         case 'hefe':
         return filter.hefe(pix);
         case 'nashville':
         return filter.nashville(pix);
         case 'sutro':
         return filter.sutro(pix);
         case 'toaster':
         return filter.toaster(pix);
         case 'walden':
         return filter.walden(pix);
         case 'nineteenSeventySeven':
         return filter.nineteenSeventySeven(pix);
         case 'kelvin':
         return filter.kelvin(pix);
         */
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
         case 'brightnessContrast':
         return filter.brightnessContrast(imageData, -0.08, 1.5);
        /*
         case 'huerotate':
         return filter.hueRotate(pix, 45);
         case 'saturate':
         return filter.saturate(pix, 20);
         case 'horizontalFlip':
         return filter.horizontalFlip(pix, width, height);
         case 'verticalFlip':
         return filter.verticalFlip(pix, width, height);
         case 'doubleFlip':
         return filter.doubleFlip(pix);
         case 'horizontalMirror':
         return filter.horizontalMirror(pix, width, height);
         case 'verticalMirror':
         return filter.verticalMirror(pix, width, height);
         case 'XYMirror':
         return filter.XYMirror(pix);
         */
        default:
            return filter.grayscale(imageData);
    }
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
                    return saveCanvas(canvas, path.join('sample-node-processed-' + type + '.jpg'));
                })
                .then(result => {
                    resolve(result);
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