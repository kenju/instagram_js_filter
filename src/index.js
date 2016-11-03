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
            'lark',
            'reyes',
            'juno',
            'slumber',
            'crema',
            'ludwig',
            'aden',
            'perpetua',
            'amaro',
            'mayfair',
            'rise',
            'hudson',
            'valencia',
            'xPro2',
            'sierra',
            'willow',
            'lofi',
            'earlybird',
            'brannan',
            'inkwell',
            'hefe',
            'nashville',
            'sutro',
            'toaster',
            'walden',
            '1977',
            'kelvin',
            'grayscale',
            'sepia',
            'luminance',
            'opacity',
            'brighten',
            'darken',
            'threshold',
            'negaposi',
            'brightnesscontrast',
            'huerotate',
            'saturate',
            'horizontalflip',
            'verticalflip',
            'doubleflip',
            'horizontalmirror',
            'verticalmirror',
            'xymirror'
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
