/** @ignore */
const canvas = require('./canvas/canvas');
/** @ignore */
const adapter = require('./adapter/adapter');

/**
 * Filter root class.
 *
 * @type {Filter}
 */
module.exports = class Filter {
    constructor() {
        this.effects = [
            'Original',
            'Lark',
            'Reyes',
            'Juno',
            'Slumber',
            'Crema',
            'Ludwig',
            'Aden',
            'Perpetua',
            'Amaro',
            'Mayfair',
            'Rise',
            'Hudson',
            'Valencia',
            'XProII',
            'Sierra',
            'Willow',
            'Lo-Fi',
            'Earlybird',
            'Brannan',
            'Inkwell',
            'Hefe',
            'Nashville',
            'Sutro',
            'Toaster',
            'Walden',
            '1977',
            'Kelvin',
            'Grayscale',
            'Sepia',
            'Luminance',
            'Brighten',
            'Darken',
            'Opacity',
            'Threshold',
            'Nega-Posi',
            'BrightnessContrast',
            'Hue-Rotate',
            'Saturate',
            'horizontalFlip',
            'verticalFlip',
            'doubleFlip',
            'horizontalMirror',
            'verticalMirror',
            'XYMirror'
        ];
    }

    /**
     * Get all supported effect types
     *
     * @returns {Array|string[]} - supported effect types
     */
    getSupportedEffects() {
        return this.effects;
    };

    /**
     * Apply filter.
     *
     * @param {Buffer} imageBuffer - a image buffer to apply filter
     * @param {String} effect - filter effect
     * @param {Object} optionArgs - options
     * @returns {*} - filter-applied image
     */
    apply(imageBuffer, effect, optionArgs) {
        const options = !optionArgs ? optionArgs : {};

        let imageData = imageBuffer;
        let convertResult = {};
        if (Buffer.isBuffer(imageBuffer)) {
            convertResult = canvas.convert(imageBuffer);
            imageData = convertResult.imageData;
        }

        const func = adapter.effectFunc(effect);
        const convertedPixels = func.apply(this, [imageData.data, options]);
        imageData.data = convertedPixels;

        if (convertResult.context) {
            convertResult.context.putImageData(imageData, 0, 0);
            return canvas.getBase64(convertResult.canvas);
        }
        return imageData;
    };
};
