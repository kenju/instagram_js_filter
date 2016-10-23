/**
 * index.js
 */

const canvas = require('./canvas/canvas');
const adapter = require('./adapter/adapter');

/**
 * Apply filter.
 *
 * @param {Buffer} imageBuffer - a image buffer to appply filter
 * @param {String} type - filter type
 * @param {Object} optionArgs - options
 * @returns {*}
 */
module.exports.filter = (imageBuffer, type, optionArgs) => {
    const options = !optionArgs ? optionArgs : {};

    let imageData = imageBuffer;
    let convertResult = {};
    if (Buffer.isBuffer(imageBuffer)) {
        convertResult = canvas.convert(imageBuffer);
        imageData = convertResult.imageData;
    }

    const func = adapter.handleType(type);
    const convertedPixels = func.apply(this, [imageData.data, options]);
    imageData.data = convertedPixels;

    if (convertResult.context) {
        convertResult.context.putImageData(imageData, 0, 0);
        return canvas.getBase64(convertResult.canvas);
    }
    return imageData;
};
