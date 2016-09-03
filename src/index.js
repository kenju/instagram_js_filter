/**
 * index.js
 */

const canvas = require('./canvas/canvas');
const adapter = require('./adapter/adapter');

// TODO: implement logic when base64 is passed
// TODO: implement optionsArgs for some effects which use options
// TODO: increase supported options
module.exports.filter = (input, type, optionArgs) => {
    const options = !optionArgs ? optionArgs : {};

    let imageData = input;
    let convertResult = {};
    if (Buffer.isBuffer(input)) {
        convertResult = canvas.convert(input);
        imageData = convertResult.imageData;
    }

    const func = adapter.handleType(type);
    const newImageData = func.apply(this, [imageData, options]);

    if (convertResult.context) {
        convertResult.context.putImageData(newImageData, 0, 0);
        return canvas.getBase64(convertResult.canvas);
    }
    return newImageData;
};
