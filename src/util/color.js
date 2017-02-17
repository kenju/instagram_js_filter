module.exports.getUnit8Array = (len) => new Uint8Array(len);

module.exports.convertNTSC = (red, green, blue) => red * 0.29 + green * 0.58 + blue * 0.11;

module.exports.blackOrWhite = (red, green, blue, threshold) => {
  const value = (red + green + blue) * 0.33;
  return (threshold >= value) ? 255 : 0;
};

module.exports.convertLuminanceLinearRGB = (red, green, blue) => red * 0.2126 + green * 0.7152 + blue * 0.0722;

module.exports.identityLUT = () => {
  const lut = this.getUnit8Array(256);
  for (let i = 0; i < lut.length; i++) {
    lut[i] = i;
  }
  return lut;
};

module.exports.applyLUT = (pix, lut) => {
  const pixResult = Object.assign({}, pix);
  const red = lut.red;
  const green = lut.green;
  const blue = lut.blue;
  const alpha = lut.alpha;
  const len = pix.length;
  for (let i = 0; i < len; i += 4) {
    pixResult[i] = red[pix[i]];
    pixResult[i + 1] = green[pix[i + 1]];
    pixResult[i + 2] = blue[pix[i + 2]];
    pixResult[i + 3] = alpha[pix[i + 3]];
  }
  return pixResult;
};

// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
module.exports.rgb2hsl = (red, green, blue) => {
  let h;
  let s;
  let diff;

  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
        // achromatic
    h = s = 0;
  } else {
    diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
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
      default:
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

module.exports.hsl2rgb = (h, s, l) => {
  let r;
  let g;
  let b;
  let q;
  let p;

  if (s === 0) {
        // achromatic
    r = g = b = l;
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
  let threshold = t;
  switch (threshold) {
    case threshold < 0:
      threshold += 1;
      break;
    case threshold > 1:
      threshold -= 1;
      break;
    case threshold < 1 / 6:
      return p + (q - p) * 6 * threshold;
    case threshold < 1 / 2:
      return q;
    case threshold < 2 / 3:
      return p + (q - p) * (2 / 3 - threshold) * 6;
    default:
      return p;
  }
  return p;
};

module.exports.rgb2hsv = (red, green, blue) => {
  let h;
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;

  const diff = max - min;
  const s = max === 0 ? 0 : diff / max;

  if (max === min) {
        // achromatic
    h = 0;
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
      default:
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

  const i = Math.floor(h * 6); // iterator
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  return [r * 255, g * 255, b * 255];
};

