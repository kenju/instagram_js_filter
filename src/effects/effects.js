const Lagrange = require('../computation/lagrange');
const color = require('../util/color');

const lagrangeRgbMap = require('./rgb_map');

const applyInstagramFilter = (filterType, pix) => {
    const rgbMap = lagrangeRgbMap[filterType];
    const lagrangeRed = new Lagrange(0, 0, 1, 1);
    const lagrangeGreen = new Lagrange(0, 0, 1, 1);
    const lagrangeBlue = new Lagrange(0, 0, 1, 1);
    lagrangeRed.addMultiPoints(rgbMap.r);
    lagrangeGreen.addMultiPoints(rgbMap.g);
    lagrangeBlue.addMultiPoints(rgbMap.b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = lagrangeRed.valueOf(pix[i]);
        pix[i + 1] = lagrangeBlue.valueOf(pix[i + 1]);
        pix[i + 2] = lagrangeGreen.valueOf(pix[i + 2]);
    }
    return pix;
};

module.exports.enhance = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = pix[i] * 1.24;
        pix[i + 1] = pix[i + 1] * 1.33;
        pix[i + 2] = pix[i + 2] * 1.21;
    }
    return pix;
};
module.exports.grayscale = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const r = pix[i];
        const g = pix[i + 1];
        const b = pix[i + 2];
        const grayscale = color.convertNTSC(r, g, b);
        pix[i] = grayscale;
        pix[i + 1] = grayscale;
        pix[i + 2] = grayscale;
    }
    return pix;
};
module.exports.sepia = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = pix[i] * 1.07;
        pix[i + 1] = pix[i + 1] * 0.74;
        pix[i + 2] = pix[i + 2] * 0.43;
    }
    return pix;
};
module.exports.luminance = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const r = pix[i];
        const g = pix[i + 1];
        const b = pix[i + 2];
        const luminance = color.convertLuminanceLinearRGB(r, g, b);
        pix[i] = luminance;
        pix[i + 1] = luminance;
        pix[i + 2] = luminance;
    }
    return pix;
};
module.exports.negaposi = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] = 255 - pix[i];
        pix[i + 1] = 255 - pix[i + 1];
        pix[i + 2] = 255 - pix[i + 2];
    }
    return pix;
};
module.exports.opacity = (pix, options) => {
    const val = options.value ? options.value : 0.5;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i + 3] = pix[i + 3] * val;
    }
    return pix;
};
module.exports.brighten = (pix, options) => {
    const val = options.value ? options.value : 50;
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] += val;
        pix[i + 1] += val;
        pix[i + 2] += val;
    }
    return pix;
};
module.exports.darken = (pix, value = 50) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        pix[i] -= value;
        pix[i + 1] -= value;
        pix[i + 2] -= value;
    }
    return pix;
};
module.exports.threshold = (pix) => {
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        const r = pix[i];
        const g = pix[i + 1];
        const b = pix[i + 2];
        const threshold = color.convertNTSC(r, g, b);
        const bw = color.blackOrWhite(r, g, b, threshold);
        pix[i] = bw;
        pix[i + 1] = bw;
        pix[i + 2] = bw;
    }
    return pix;
};
module.exports.hueRotate = (pix, deg = 45) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[0] = hsv[0] * deg / 360;
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    return pix;
};
module.exports.saturate = (pix, num = 20) => {
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[1] = hsv[1] * num / 100;
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    return pix;
};
module.exports.brightnessContrast = (pix, brightness = -0.08, contrast = 1.5) => {
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
    pix = color.applyLUT(
        pix,
        {
            red: lut,
            green: lut,
            blue: lut,
            alpha: color.identityLUT()
        }
    );
    return pix;
};
module.exports.horizontalFlip = (pix, width, height) => {
    const pixResult = Object.assign([], pix);
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
    return pix;
};
module.exports.verticalFlip = (pix, width, height) => {
    const pixResult = Object.assign([], pix);
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
    return pix;
};
module.exports.doubleFlip = (pix) => {
    const pixResult = Object.assign([], pix);
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        pix[i] = pixResult[len - i];
        pix[i + 1] = pixResult[len - i + 1];
        pix[i + 2] = pixResult[len - i + 2];
        pix[i + 3] = pixResult[len - i + 3];
    }
    return pix;
};
module.exports.horizontalMirror = (pix, width, height) => {
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
    return pix;
};
module.exports.verticalMirror = (pix, width, height) => {
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
    return pix;
};
module.exports.XYMirror = (pix) => {
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        pix[i] = pix[len - i];
        pix[i + 1] = pix[len - i + 1];
        pix[i + 2] = pix[len - i + 2];
        pix[i + 3] = pix[len - i + 3];
    }
    return pix;
};
module.exports.lark = (pix) => {
    return applyInstagramFilter('lark', pix);
};
module.exports.reyes = (pix) => {
    return applyInstagramFilter('reyes', pix);
};
module.exports.juno = (pix) => {
    return applyInstagramFilter('juno', pix);
};
module.exports.slumber = (pix) => {
    return applyInstagramFilter('slumber', pix);
};
module.exports.crema = (pix) => {
    return applyInstagramFilter('crema', pix);
};
module.exports.ludwig = (pix) => {
    return applyInstagramFilter('ludwig', pix);
};
module.exports.aden = (pix) => {
    return applyInstagramFilter('aden', pix);
};
module.exports.perpetua = (pix) => {
    return applyInstagramFilter('perpetua', pix);
};
module.exports.amaro = (pix) => {
    return applyInstagramFilter('amaro', pix);
};
module.exports.mayfair = (pix) => {
    return applyInstagramFilter('mayfair', pix);
};
module.exports.rise = (pix) => {
    return applyInstagramFilter('rise', pix);
};
module.exports.hudson = (pix) => {
    return applyInstagramFilter('hudson', pix);
};
module.exports.valencia = (pix) => {
    return applyInstagramFilter('valencia', pix);
};
module.exports.xpro2 = (pix) => {
    return applyInstagramFilter('xpro2', pix);
};
module.exports.sierra = (pix) => {
    return applyInstagramFilter('sierra', pix);
};
module.exports.willow = (pix) => {
    return applyInstagramFilter('willow', pix);
};
module.exports.lofi = (pix) => {
    return applyInstagramFilter('lofi', pix);
};
module.exports.earlybird = (pix) => {
    return applyInstagramFilter('earlybird', pix);
};
module.exports.brannan = (pix) => {
    return applyInstagramFilter('brannan', pix);
};
module.exports.inkwell = (pix) => {
    const n = pix.length;
    for (let i = 0; i < n; i += 4) {
        const val = pix[i] * 0.33 + pix[i + 1] * 0.58 + pix[i + 2] * 0.22;
        pix[i] = val;
        pix[i + 1] = val;
        pix[i + 2] = val;
    }
    return pix;
};
module.exports.hefe = (pix) => {
    return applyInstagramFilter('hefe', pix);
};
module.exports.nashville = (pix) => {
    return applyInstagramFilter('nashville', pix);
};
module.exports.sutro = (pix) => {
    return applyInstagramFilter('sutro', pix);
};
module.exports.toaster = (pix) => {
    return applyInstagramFilter('toaster', pix);
};
module.exports.walden = (pix) => {
    return applyInstagramFilter('walden', pix);
};
module.exports.nineteenSeventySeven = (pix) => {
    return applyInstagramFilter('nineteenSeventySeven', pix);
};
module.exports.kelvin = (pix) => {
    return applyInstagramFilter('kelvin', pix);
};

