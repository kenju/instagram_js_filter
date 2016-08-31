/**
 * color.js
 *
 * TODO: can be npm published
 */

const object = require('./object');

module.exports.getUnit8Array = (len) => {
    return new Uint8Array(len);
};

module.exports.identityLUT = () => {
    const lut = this.getUnit8Array(256);
    for (let i = 0; i < lut.length; i++) {
        lut[i] = i;
    }
    return lut;
};

module.exports.applyLUT = (pix, lut) => {
    let i;
    const pix_result = object.clone(pix);
    const red = lut.red;
    const green = lut.green;
    const blue = lut.blue;
    const alpha = lut.alpha;
    const len = pix.length;
    for (i = 0; i < len; i += 4) {
        pix[i] = red[pix_result[i]];
        pix[i + 1] = green[pix_result[i + 1]];
        pix[i + 2] = blue[pix_result[i + 2]];
        pix[i + 3] = alpha[pix_result[i + 3]];
    }
    return pix;
};

// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
module.exports.rgb2hsl = (r, g, b) => {
    let max;
    let min;
    let h;
    let s;
    let l;
    let diff;

    r = r / 255;
    g = g / 255;
    b = b / 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);

    if (max === min) {
        h = s = 0; //achromatic
    } else {
        diff = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g ) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
};

module.exports.hsl2rgb = (h, s, v) => {
    let r;
    let g;
    let b;
    let q;
    let p;

    if (s === 0) {
        r = g = b = l; //achromatic
    } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1 / 3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
};

module.exports.hue2rgb = (p, q, t) => {
    switch (t) {
        case t < 0 :
            t += 1;
            break;
        case t > 1 :
            t -= 1;
            break;
        case t < 1 / 6 :
            return p + (q - p) * 6 * t;
        case t < 1 / 2 :
            return q;
        case t < 2 / 3 :
            return p + (q - p) * (2 / 3 - t) * 6;
            return p;
    }
};

module.exports.rgb2hsv = (r, g, b) => {
    let max;
    let min;
    let h;
    let s;
    let v;
    let diff;
    r = r / 255;
    g = g / 255;
    b = b / 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    v = max; // value

    diff = max - min;
    s = max === 0 ? 0 : diff / max;

    if (max === min) {
        h = 0; //achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, v];
};

module.exports.hsv2rgb = (h, s, v) => {
    let r;
    let g;
    let b;
    let i;
    let f;
    let p;
    let q;
    let t;

    i = Math.floor(h * 6); // iterator
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return [r * 255, g * 255, b * 255];
};

