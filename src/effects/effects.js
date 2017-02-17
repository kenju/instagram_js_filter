const Lagrange = require('../computation/lagrange');
const color = require('../util/color');

const lagrangeRgbMap = require('./rgb_map');

const applyInstagramFilter = (filterType, pix) => {
    const newPix = pix.slice();
    const rgbMap = lagrangeRgbMap[filterType];
    const lagrangeR = new Lagrange(0, 0, 1, 1);
    const lagrangeG = new Lagrange(0, 0, 1, 1);
    const lagrangeB = new Lagrange(0, 0, 1, 1);
    lagrangeR.addMultiPoints(rgbMap.r);
    lagrangeG.addMultiPoints(rgbMap.g);
    lagrangeB.addMultiPoints(rgbMap.b);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        newPix[i] = lagrangeR.valueOf(pix[i]);
        newPix[i + 1] = lagrangeB.valueOf(pix[i + 1]);
        newPix[i + 2] = lagrangeG.valueOf(pix[i + 2]);
    }
    return newPix;
};

module.exports.enhance = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = pix[i] * 1.24;
        pix[i + 1] = pix[i + 1] * 1.33;
        pix[i + 2] = pix[i + 2] * 1.21;
    }
    return pix;
};
module.exports.grayscale = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const { r, g, b } = { r: pix[i], g: pix[i + 1], b: pix[i + 1] };
        const grayscale = color.convertNTSC(r, g, b);
        pix[i] = grayscale;
        pix[i + 1] = grayscale;
        pix[i + 2] = grayscale;
    }
    return pix;
};
module.exports.sepia = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = pix[i] * 1.07;
        pix[i + 1] = pix[i + 1] * 0.74;
        pix[i + 2] = pix[i + 2] * 0.43;
    }
    return pix;
};
module.exports.luminance = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const { r, g, b } = { r: pix[i], g: pix[i + 1], b: pix[i + 1] };
        const luminance = color.convertLuminanceLinearRGB(r, g, b);
        pix[i] = luminance;
        pix[i + 1] = luminance;
        pix[i + 2] = luminance;
    }
    return pix;
};
module.exports.negaposi = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = 255 - pix[i];
        pix[i + 1] = 255 - pix[i + 1];
        pix[i + 2] = 255 - pix[i + 2];
    }
    return pix;
};
module.exports.opacity = (imageData, options) => {
    const pix = imageData.data;
    const val = options.value ? options.value : 0.5;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i + 3] = pix[i + 3] * val;
    }
    return pix;
};
module.exports.brighten = (imageData, options) => {
    const pix = imageData.data;
    const val = options.value ? options.value : 50;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] += val;
        pix[i + 1] += val;
        pix[i + 2] += val;
    }
    return pix;
};
module.exports.darken = (imageData, options) => {
    const pix = imageData.data;
    const val = options.value ? options.value : 50;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] -= val;
        pix[i + 1] -= val;
        pix[i + 2] -= val;
    }
    return pix;
};
module.exports.threshold = (imageData) => {
    const pix = imageData.data;
    const len = pix.length;
    for (let i = 0; i < len; i += 4) {
        const { r, g, b } = { r: pix[i], g: pix[i + 1], b: pix[i + 1] };
        const threshold = color.convertNTSC(r, g, b);
        const bw = color.blackOrWhite(r, g, b, threshold);
        pix[i] = bw;
        pix[i + 1] = bw;
        pix[i + 2] = bw;
    }
    return pix;
};
module.exports.hueRotate = (imageData, options) => {
    const pix = imageData.data;
    const deg = options.degree ? options.degree : 45;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[0] = hsv[0] * deg / 360;
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    return pix;
};
module.exports.saturate = (imageData, options) => {
    const pix = imageData.data;
    const val = options.value ? options.value : 20;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const hsv = color.rgb2hsv(pix[i], pix[i + 1], pix[i + 2]);
        hsv[1] = hsv[1] * val / 100;
        const rgb = color.hsv2rgb(hsv[0], hsv[1], hsv[2]);
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }
    return pix;
};
module.exports.brightnessContrast = (imageData, options) => {
    const pix = imageData.data;
    const brightness = options.brightness ? options.brightness : -0.08;
    const contrast = options.contrast ? options.contrast : 1.5;
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
    return color.applyLUT(
        pix,
        {
            red: lut,
            green: lut,
            blue: lut,
            alpha: color.identityLUT(),
        }
    );
};
module.exports.horizontalFlip = (imageData) => {
    const pix = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const newPix = Object.assign([], pix);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = (i * width + (width - j - 1)) * 4;
            pix[dstOff] = newPix[off];
            pix[dstOff + 1] = newPix[off + 1];
            pix[dstOff + 2] = newPix[off + 2];
            pix[dstOff + 3] = newPix[off + 3];
        }
    }
    return pix;
};
module.exports.verticalFlip = (imageData) => {
    const pix = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const newPix = Object.assign([], pix);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const off = (i * width + j) * 4;
            const dstOff = ((height - i - 1) * width + j) * 4;
            pix[dstOff] = newPix[off];
            pix[dstOff + 1] = newPix[off + 1];
            pix[dstOff + 2] = newPix[off + 2];
            pix[dstOff + 3] = newPix[off + 3];
        }
    }
    return pix;
};
module.exports.doubleFlip = (imageData) => {
    const pix = imageData.data;
    const newPix = Object.assign([], pix);
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = newPix[n - i];
        pix[i + 1] = newPix[n - i + 1];
        pix[i + 2] = newPix[n - i + 2];
        pix[i + 3] = newPix[n - i + 3];
    }
    return pix;
};
module.exports.horizontalMirror = (imageData) => {
    const pix = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
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
module.exports.verticalMirror = (imageData) => {
    const pix = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
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
module.exports.XYMirror = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = pix[n - i];
        pix[i + 1] = pix[n - i + 1];
        pix[i + 2] = pix[n - i + 2];
        pix[i + 3] = pix[n - i + 3];
    }
    return pix;
};
module.exports.lark = (imageData) => {
    return applyInstagramFilter('lark', imageData.data);
};
module.exports.reyes = (imageData) => {
    return applyInstagramFilter('reyes', imageData.data);
};
module.exports.juno = (imageData) => {
    return applyInstagramFilter('juno', imageData.data);
};
module.exports.slumber = (imageData) => {
    return applyInstagramFilter('slumber', imageData.data);
};
module.exports.crema = (imageData) => {
    return applyInstagramFilter('crema', imageData.data);
};
module.exports.ludwig = (imageData) => {
    return applyInstagramFilter('ludwig', imageData.data);
};
module.exports.aden = (imageData) => {
    return applyInstagramFilter('aden', imageData.data);
};
module.exports.perpetua = (imageData) => {
    return applyInstagramFilter('perpetua', imageData.data);
};
module.exports.amaro = (imageData) => {
    return applyInstagramFilter('amaro', imageData.data);
};
module.exports.mayfair = (imageData) => {
    return applyInstagramFilter('mayfair', imageData.data);
};
module.exports.rise = (imageData) => {
    return applyInstagramFilter('rise', imageData.data);
};
module.exports.hudson = (imageData) => {
    return applyInstagramFilter('hudson', imageData.data);
};
module.exports.valencia = (imageData) => {
    return applyInstagramFilter('valencia', imageData.data);
};
module.exports.xpro2 = (imageData) => {
    return applyInstagramFilter('xpro2', imageData.data);
};
module.exports.sierra = (imageData) => {
    return applyInstagramFilter('sierra', imageData.data);
};
module.exports.willow = (imageData) => {
    return applyInstagramFilter('willow', imageData.data);
};
module.exports.lofi = (imageData) => {
    return applyInstagramFilter('lofi', imageData.data);
};
module.exports.earlybird = (imageData) => {
    return applyInstagramFilter('earlybird', imageData.data);
};
module.exports.brannan = (imageData) => {
    return applyInstagramFilter('brannan', imageData.data);
};
module.exports.inkwell = (imageData) => {
    const pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        const val = pix[i] * 0.33 + pix[i + 1] * 0.58 + pix[i + 2] * 0.22;
        pix[i] = val;
        pix[i + 1] = val;
        pix[i + 2] = val;
    }
    return pix;
};
module.exports.hefe = (imageData) => {
    return applyInstagramFilter('hefe', imageData.data);
};
module.exports.nashville = (imageData) => {
    return applyInstagramFilter('nashville', imageData.data);
};
module.exports.sutro = (imageData) => {
    return applyInstagramFilter('sutro', imageData.data);
};
module.exports.toaster = (imageData) => {
    return applyInstagramFilter('toaster', imageData.data);
};
module.exports.walden = (imageData) => {
    return applyInstagramFilter('walden', imageData.data);
};
module.exports.nineteenSeventySeven = (imageData) => {
    return applyInstagramFilter('nineteenSeventySeven', imageData.data);
};
module.exports.kelvin = (imageData) => {
    return applyInstagramFilter('kelvin', imageData.data);
};

