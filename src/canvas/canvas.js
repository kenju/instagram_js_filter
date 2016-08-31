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
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(filename + ' saved.');
        })
    });
};

const imagePath = path.join(__dirname + '/../../demo/img/sample.jpg');
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

    filter.grayscale(imageData)
        .then(newImageData => {
            context.putImageData(newImageData, 0, 0);
            return saveCanvas(canvas, 'sample-node-processed.jpg');
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.error(err);
        });

});
