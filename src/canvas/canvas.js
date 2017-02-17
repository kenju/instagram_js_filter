const Canvas = require('canvas');
const Image = Canvas.Image;

const getBase64 = (canvas) => {
    return canvas.toDataURL().split(',')[1];
};

const convert = (buffer) => {
    const image = new Image;
    image.src = buffer;

    const canvas = new Canvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    return {
        canvas,
        context,
        imageData,
    };
};

module.exports = {
    getBase64,
    convert,
};
