/**
 * index.js
 */

const canvas = require('./canvas/canvas');
const filter = require('./filter/filter');

const handleType = (type) => {
    switch (type.toLowerCase()) {
        case 'lark':
            return filter.lark;
        case 'reyes':
            return filter.reyes;
        case 'juno':
            return filter.juno;
        case 'slumber':
            return filter.slumber;
        case 'crema':
            return filter.crema;
        case 'ludwig':
            return filter.ludwig;
        case 'aden':
            return filter.aden;
        case 'perpetua':
            return filter.perpetua;
        case 'amaro':
            return filter.amaro;
        case 'mayfair':
            return filter.mayfair;
        case 'rise':
            return filter.rise;
        case 'hudson':
            return filter.hudson;
        case 'valencia':
            return filter.valencia;
        case 'xpro2':
            return filter.xpro2;
        case 'sierra':
            return filter.sierra;
        case 'willow':
            return filter.willow;
        case 'lofi':
            return filter.lofi;
        case 'earlybird':
            return filter.earlybird;
        case 'brannan':
            return filter.brannan;
        case 'inkwell':
            return filter.inkwell;
        case 'hefe':
            return filter.hefe;
        case 'nashville':
            return filter.nashville;
        case 'sutro':
            return filter.sutro;
        case 'toaster':
            return filter.toaster;
        case 'walden':
            return filter.walden;
        case 'nineteenseventyseven':
        case '1977':
            return filter.nineteenSeventySeven;
        case 'kelvin':
            return filter.kelvin;
        case 'enhance':
            return filter.enhance;
        case 'grayscale':
            return filter.grayscale;
        case 'sepia':
            return filter.sepia;
        case 'luminance':
            return filter.luminance;
        case 'opacity':
            return filter.opacity;
        case 'brighten':
            return filter.brighten;
        case 'darken':
            return filter.darken;
        case 'threshold':
            return filter.threshold;
        case 'negaposi':
            return filter.negaposi;
        case 'brightnesscontrast':
            return filter.brightnessContrast;
        case 'huerotate':
            return filter.hueRotate;
        case 'saturate':
            return filter.saturate;
        case 'horizontalflip':
            return filter.horizontalFlip;
        case 'verticalflip':
            return filter.verticalFlip;
        case 'doubleflip':
            return filter.doubleFlip;
        case 'horizontalmirror':
            return filter.horizontalMirror;
        case 'verticalmirror':
            return filter.verticalMirror;
        case 'xymirror':
            return filter.XYMirror;
        default:
            throw new Error(type + 'is not supported');
    }
};

// TODO: implement logic when base64 is passed
// TODO: implement optionsArgs for some filter which use options
// TODO: increase supported options
module.exports.filter = (input, type, optionArgs) => {
    const options = !optionArgs ? optionArgs : {};

    let imageData = input;
    let convertResult = {};
    if (Buffer.isBuffer(input)) {
        convertResult = canvas.convert(input);
        imageData = convertResult.imageData;
    }

    const func = handleType(type);
    const newImageData = func.apply(this, [imageData, options]);

    if (convertResult.context) {
        convertResult.context.putImageData(newImageData, 0, 0);
        return canvas.getBase64(convertResult.canvas);
    } else {
        return newImageData;
    }
};

