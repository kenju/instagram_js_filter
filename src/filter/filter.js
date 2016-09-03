/**
 * filter.js
 */
const Lagrange = require('../computation/lagrange');
const color = require('../util/color');
const object = require('../util/object');
module.exports.enhance = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = pix[i] * 1.24; // red
        pix[i + 1] = pix[i + 1] * 1.33; // green
        pix[i + 2] = pix[i + 2] * 1.21; // blue
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.grayscale = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const red = pix[i];
        const green = pix[i + 1];
        const blue = pix[i + 2];
        const grayscale = color.convertNTSC(red, green, blue);
        pix[i] = grayscale;
        pix[i + 1] = grayscale;
        pix[i + 2] = grayscale;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.sepia = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = pix[i] * 1.07;
        pix[i + 1] = pix[i + 1] * 0.74;
        pix[i + 2] = pix[i + 2] * 0.43;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.luminance = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const red = pix[i];
        const green = pix[i + 1];
        const blue = pix[i + 2];
        const luminance = color.convertLuminanceLinearRGB(red, green, blue);
        pix[i] = luminance;
        pix[i + 1] = luminance;
        pix[i + 2] = luminance;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.negaposi = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = 255 - pix[i];
        pix[i + 1] = 255 - pix[i + 1];
        pix[i + 2] = 255 - pix[i + 2];
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.opacity = (imageData, value) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i + 3] = pix[i + 3] * value;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.brighten = (imageData, value) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] += value;
        pix[i + 1] += value;
        pix[i + 2] += value;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.darken = (imageData, value) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] -= value;
        pix[i + 1] -= value;
        pix[i + 2] -= value;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.threshold = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        const red = pix[i];
        const green = pix[i + 1];
        const blue = pix[i + 2];
        const threshold = color.convertNTSC(red, green, blue);
        const newValue = color.blackOrWhite(red, green, blue, threshold);
        pix[i] = newValue;
        pix[i + 1] = newValue;
        pix[i + 2] = newValue;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.hueRotate = (imageData, deg) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[0] = hsv[0] * deg / 360; // hue is from 0 to 360
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.saturate = (imageData, num) => {
    const newImageData = imageData;
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[1] = hsv[1] * num / 100;
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.brightnessContrast = (imageData, brightness, contrast) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const contrastAdjust = -128 * contrast + 128;
    const brightnessAdjust = 255 * brightness;
    const adjust = contrastAdjust + brightnessAdjust;
    const lut = color.getUnit8Array(256);
    const len = lut.length;
    for (let i = 0; i < len; i++) {
        const c = i * contrast + adjust;
        if (c < 0) {
            lut[i] = 0;
        } else {
            lut[i] = (c > 255) ? 255 : c;
        }
    }
    // FIXME: has side-effects
    newImageData.data = color.applyLUT(
        pix,
        {
            red: lut,
            green: lut,
            blue: lut,
            alpha: color.identityLUT()
        }
    );
    return newImageData;
};
module.exports.horizontalFlip = (imageData) => {
    const newImageData = imageData;
    const width = imageData.width;
    const height = imageData.height;
    const pix = imageData.data;
    const pixResult = object.clone(pix);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = (i * width + (width - j - 1)) * 4;
            pix[dstOff] = pixResult[off];
            pix[dstOff + 1] = pixResult[off + 1];
            pix[dstOff + 2] = pixResult[off + 2];
            pix[dstOff + 3] = pixResult[off + 3];
        }
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.verticalFlip = (imageData) => {
    const newImageData = imageData;
    const width = imageData.width;
    const height = imageData.height;
    const pix = imageData.data;
    const pixResult = object.clone(pix);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = ((height - i - 1) * width + j) * 4;
            pix[dstOff] = pixResult[off];
            pix[dstOff + 1] = pixResult[off + 1];
            pix[dstOff + 2] = pixResult[off + 2];
            pix[dstOff + 3] = pixResult[off + 3];
        }
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.doubleFlip = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const pixResult = object.clone(pix);
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        pix[i] = pixResult[len - i];
        pix[i + 1] = pixResult[len - i + 1];
        pix[i + 2] = pixResult[len - i + 2];
        pix[i + 3] = pixResult[len - i + 3];
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.horizontalMirror = (imageData) => {
    const newImageData = imageData;
    const width = imageData.width;
    const height = imageData.height;
    const pix = imageData.data;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = (i * width + (width - j - 1)) * 4;
            pix[dstOff] = pix[off];
            pix[dstOff + 1] = pix[off + 1];
            pix[dstOff + 2] = pix[off + 2];
            pix[dstOff + 3] = pix[off + 3];
        }
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.verticalMirror = (imageData) => {
    const newImageData = imageData;
    const width = imageData.width;
    const height = imageData.height;
    const pix = imageData.data;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = ((height - i - 1) * width + j) * 4;
            pix[dstOff] = pix[off];
            pix[dstOff + 1] = pix[off + 1];
            pix[dstOff + 2] = pix[off + 2];
            pix[dstOff + 3] = pix[off + 3];
        }
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.XYMirror = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        pix[i] = pix[len - i];
        pix[i + 1] = pix[len - i + 1];
        pix[i + 2] = pix[len - i + 2];
        pix[i + 3] = pix[len - i + 3];
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.lark = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 25],
        [2, 82, 90],
        [3, 128, 120],
        [4, 200, 230],
        [5, 255, 250]
    ];
    const g = [
        [0, 0, 0],
        [1, 48, 52],
        [2, 115, 128],
        [3, 160, 170],
        [4, 233, 245],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 35, 40],
        [2, 106, 115],
        [3, 151, 158],
        [4, 215, 219],
        [5, 240, 245],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.reyes = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 35],
        [2, 82, 90],
        [3, 128, 130],
        [4, 200, 220],
        [5, 255, 250]
    ];
    const g = [
        [0, 0, 0],
        [1, 48, 42],
        [2, 115, 128],
        [3, 160, 155],
        [4, 233, 255],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 35, 30],
        [2, 106, 105],
        [3, 151, 153],
        [4, 215, 209],
        [5, 240, 245],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.juno = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 35],
        [2, 82, 85],
        [3, 128, 131],
        [4, 200, 210],
        [5, 255, 250]
    ];
    const g = [
        [0, 0, 15],
        [1, 48, 52],
        [2, 115, 128],
        [3, 160, 172],
        [4, 233, 245],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 35, 32],
        [2, 106, 105],
        [3, 151, 148],
        [4, 215, 219],
        [5, 240, 245],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.slumber = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 25],
        [2, 82, 80],
        [3, 128, 110],
        [4, 200, 220],
        [5, 255, 245]
    ];
    const g = [
        [0, 0, 0],
        [1, 48, 45],
        [2, 115, 110],
        [3, 160, 158],
        [4, 233, 235],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 35, 32],
        [2, 106, 103],
        [3, 151, 148],
        [4, 215, 210],
        [5, 240, 245],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.crema = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 35],
        [2, 82, 90],
        [3, 128, 130],
        [4, 255, 250]
    ];
    const g = [
        [0, 0, 0],
        [1, 48, 52],
        [2, 115, 128],
        [3, 160, 170],
        [4, 255, 250]
    ];
    const b = [
        [0, 0, 0],
        [1, 35, 40],
        [2, 106, 115],
        [3, 181, 170],
        [4, 255, 250]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.ludwig = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 10],
        [1, 30, 45],
        [2, 82, 98],
        [3, 130, 135],
        [4, 255, 250]
    ];
    const g = [
        [0, 0, 10],
        [1, 48, 55],
        [2, 115, 128],
        [3, 160, 170],
        [4, 255, 250]
    ];
    const b = [
        [0, 0, 10],
        [1, 35, 40],
        [2, 106, 115],
        [3, 181, 185],
        [4, 255, 250]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.aden = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 20],
        [1, 50, 65],
        [2, 100, 125],
        [3, 180, 195],
        [4, 255, 250]
    ];
    const g = [
        [0, 0, 10],
        [1, 50, 65],
        [2, 100, 105],
        [3, 180, 188],
        [4, 255, 248]
    ];
    const b = [
        [0, 0, 0],
        [1, 50, 55],
        [2, 100, 105],
        [3, 180, 185],
        [4, 255, 235]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.perpetua = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 35],
        [1, 50, 65],
        [2, 100, 125],
        [3, 180, 195],
        [4, 255, 255]
    ];
    const g = [
        [0, 0, 25],
        [1, 50, 65],
        [2, 100, 105],
        [3, 180, 188],
        [4, 255, 255]
    ];
    const b = [
        [0, 0, 25],
        [1, 50, 55],
        [2, 100, 105],
        [3, 180, 185],
        [4, 255, 255]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.amaro = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 19],
        [1, 30, 62],
        [2, 82, 148],
        [3, 128, 188],
        [4, 145, 200],
        [5, 255, 250]
    ];
    const g = [
        [0, 0, 0],
        [1, 48, 72],
        [2, 115, 188],
        [3, 160, 120],
        [4, 233, 245],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 25],
        [1, 35, 80],
        [2, 106, 175],
        [3, 151, 188],
        [4, 215, 215],
        [5, 240, 235],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.mayfair = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 30],
        [1, 85, 110],
        [2, 125, 170],
        [3, 221, 232],
        [4, 254, 242]
    ];
    const g = [
        [0, 0, 15],
        [1, 40, 55],
        [2, 80, 95],
        [3, 142, 196],
        [4, 188, 215],
        [5, 255, 230]
    ];
    const b = [
        [0, 0, 15],
        [1, 45, 60],
        [2, 85, 115],
        [3, 135, 185],
        [4, 182, 215],
        [5, 235, 230],
        [6, 255, 225]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.rise = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 25],
        [1, 30, 70],
        [2, 130, 192],
        [3, 170, 200],
        [4, 233, 233],
        [5, 255, 255]
    ];
    const g = [
        [0, 0, 25],
        [1, 30, 72],
        [2, 65, 118],
        [3, 100, 158],
        [4, 152, 195],
        [5, 210, 230],
        [6, 250, 250]
    ];
    const b = [
        [0, 0, 35],
        [1, 40, 75],
        [2, 82, 124],
        [3, 120, 162],
        [4, 175, 188],
        [5, 220, 214],
        [6, 255, 255]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.hudson = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 35],
        [1, 42, 68],
        [2, 85, 115],
        [3, 124, 165],
        [4, 170, 200],
        [5, 215, 228],
        [6, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 45, 60],
        [2, 102, 135],
        [3, 140, 182],
        [4, 192, 215],
        [5, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 24, 42],
        [2, 60, 100],
        [3, 105, 170],
        [4, 145, 208],
        [5, 210, 235],
        [6, 255, 245]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.valencia = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 20],
        [1, 50, 80],
        [2, 85, 120],
        [3, 128, 162],
        [4, 228, 224],
        [5, 255, 240]
    ];
    const g = [
        [0, 0, 0],
        [1, 18, 12],
        [2, 60, 70],
        [3, 104, 128],
        [4, 148, 178],
        [5, 212, 224],
        [6, 255, 255]
    ];
    const b = [
        [0, 0, 20],
        [1, 42, 62],
        [2, 80, 104],
        [3, 124, 144],
        [4, 170, 182],
        [5, 220, 210],
        [6, 255, 230]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.xpro2 = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 42, 28],
        [2, 105, 100],
        [3, 148, 160],
        [4, 185, 208],
        [5, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 40, 25],
        [2, 85, 75],
        [3, 125, 130],
        [4, 165, 180],
        [5, 212, 230],
        [6, 255, 255]
    ];
    const b = [
        [0, 0, 30],
        [1, 40, 58],
        [2, 82, 90],
        [3, 125, 125],
        [4, 170, 160],
        [5, 225, 210],
        [6, 255, 222]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.sierra = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 10],
        [1, 48, 88],
        [2, 105, 155],
        [3, 130, 180],
        [4, 190, 212],
        [5, 232, 234],
        [6, 255, 245]
    ];
    const g = [
        [0, 0, 0],
        [1, 38, 72],
        [2, 85, 124],
        [3, 124, 160],
        [4, 172, 186],
        [5, 218, 210],
        [6, 255, 230]
    ];
    const b = [
        [0, 0, 30],
        [1, 45, 82],
        [2, 95, 132],
        [3, 138, 164],
        [4, 176, 182],
        [5, 210, 200],
        [6, 255, 218]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.willow = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 30],
        [1, 68, 105],
        [2, 95, 145],
        [3, 175, 215],
        [4, 255, 240]
    ];
    const g = [
        [0, 0, 30],
        [1, 55, 85],
        [2, 105, 160],
        [3, 198, 210],
        [4, 255, 230]
    ];
    const b = [
        [0, 0, 30],
        [1, 40, 70],
        [2, 112, 165],
        [3, 195, 215],
        [4, 255, 288]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.lofi = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 40, 20],
        [2, 88, 80],
        [3, 128, 150],
        [4, 170, 200],
        [5, 230, 245],
        [6, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 35, 15],
        [2, 90, 70],
        [3, 105, 105],
        [4, 148, 180],
        [5, 188, 218],
        [6, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 62, 50],
        [2, 100, 95],
        [3, 130, 155],
        [4, 150, 182],
        [5, 190, 220],
        [6, 255, 255]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.earlybird = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 25],
        [1, 45, 80],
        [2, 85, 135],
        [3, 120, 180],
        [4, 230, 240],
        [5, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 40, 55],
        [2, 88, 112],
        [3, 168, 198],
        [4, 132, 172],
        [5, 215, 218],
        [6, 255, 240]
    ];
    const b = [
        [0, 0, 18],
        [1, 42, 58],
        [2, 90, 102],
        [3, 120, 130],
        [4, 164, 170],
        [5, 212, 195],
        [6, 255, 210]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.brannan = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 35],
        [1, 40, 50],
        [2, 125, 165],
        [3, 175, 230],
        [4, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 65, 50],
        [2, 92, 102],
        [3, 180, 220],
        [4, 255, 255]
    ];
    const b = [
        [0, 0, 35],
        [1, 62, 62],
        [2, 88, 95],
        [3, 132, 158],
        [4, 225, 230],
        [5, 255, 232]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.inkwell = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const val = pix[i] * 0.33 + pix[i + 1] * 0.58 + pix[i + 2] * 0.22;
        pix[i] = val;
        pix[i + 1] = val;
        pix[i + 2] = val;
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.hefe = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 60, 55],
        [2, 130, 155],
        [3, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 65, 40],
        [2, 125, 125],
        [3, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 65, 30],
        [2, 125, 105],
        [3, 170, 165],
        [4, 255, 240]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.nashville = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 30, 5],
        [2, 58, 25],
        [3, 83, 85],
        [4, 112, 140],
        [5, 190, 120],
        [6, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 20, 5],
        [2, 50, 62],
        [3, 132, 150],
        [4, 190, 205],
        [5, 255, 225]
    ];
    const b = [
        [0, 0, 65],
        [1, 40, 90],
        [2, 85, 115],
        [3, 212, 185],
        [4, 255, 205]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.sutro = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 40, 35],
        [2, 90, 92],
        [3, 145, 155],
        [4, 235, 230],
        [5, 255, 235]
    ];
    const g = [
        [0, 0, 0],
        [1, 62, 50],
        [2, 155, 140],
        [3, 210, 188],
        [4, 255, 225]
    ];
    const b = [
        [0, 0, 0],
        [1, 80, 80],
        [2, 182, 145],
        [3, 128, 112],
        [4, 255, 220]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.toaster = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 120],
        [1, 50, 160],
        [2, 105, 198],
        [3, 145, 215],
        [4, 190, 230],
        [5, 255, 255]
    ];
    const g = [
        [0, 0, 0],
        [1, 22, 60],
        [2, 125, 180],
        [3, 255, 255]
    ];
    const b = [
        [0, 0, 50],
        [1, 40, 60],
        [2, 80, 102],
        [3, 122, 148],
        [4, 185, 185],
        [5, 255, 210]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.walden = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 12],
        [1, 40, 44],
        [2, 85, 125],
        [3, 122, 180],
        [4, 170, 220],
        [5, 255, 250]
    ];
    const g = [
        [0, 0, 35],
        [1, 40, 78],
        [2, 90, 140],
        [3, 130, 188],
        [4, 175, 215],
        [5, 255, 245]
    ];
    const b = [
        [0, 0, 85],
        [1, 85, 150],
        [2, 130, 170],
        [3, 165, 185],
        [4, 255, 220]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.nineteenSeventySeven = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 75],
        [1, 75, 125],
        [2, 145, 200],
        [3, 190, 220],
        [4, 255, 230]
    ];
    const g = [
        [0, 0, 52],
        [1, 42, 54],
        [2, 110, 120],
        [3, 154, 168],
        [4, 232, 235],
        [5, 255, 242]
    ];
    const b = [
        [0, 0, 62],
        [1, 65, 82],
        [2, 108, 132],
        [3, 175, 210],
        [4, 210, 208],
        [5, 255, 208]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
module.exports.kelvin = (imageData) => {
    const newImageData = imageData;
    const pix = imageData.data;
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    const r = [
        [0, 0, 0],
        [1, 60, 102],
        [2, 110, 185],
        [3, 150, 220],
        [4, 235, 245],
        [5, 255, 245]
    ];
    const g = [
        [0, 0, 0],
        [1, 68, 68],
        [2, 105, 120],
        [3, 190, 220],
        [4, 255, 255]
    ];
    const b = [
        [0, 0, 0],
        [1, 88, 12],
        [2, 145, 140],
        [3, 185, 212],
        [4, 255, 255]
    ];
    lagrangeRed.addMultiPoints(r);
    lagrangeGreen.addMultiPoints(g);
    lagrangeBlue.addMultiPoints(b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    newImageData.data = pix;
    return newImageData;
};
