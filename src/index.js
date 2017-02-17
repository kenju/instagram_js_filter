/** @ignore */
const canvas = require('./canvas/canvas');
/** @ignore */
const effects = require('./effects/effects');

/**
 * Filter root class.
 *
 * @type {Filter}
 */
class Filter {
  constructor() {
    this.effectMap = {
      lark: effects.lark,
      reyes: effects.reyes,
      juno: effects.juno,
      slumber: effects.slumber,
      crema: effects.crema,
      ludwig: effects.ludwig,
      aden: effects.aden,
      perpetua: effects.perpetua,
      amaro: effects.amaro,
      mayfair: effects.mayfair,
      rise: effects.rise,
      hudson: effects.hudson,
      valencia: effects.valencia,
      xpro2: effects.xpro2,
      sierra: effects.sierra,
      willow: effects.willow,
      lofi: effects.lofi,
      earlybird: effects.earlybird,
      brannan: effects.brannan,
      inkwell: effects.inkwell,
      hefe: effects.hefe,
      nashville: effects.nashville,
      sutro: effects.sutro,
      toaster: effects.toaster,
      walden: effects.walden,
      nineteenseventyseven: effects.nineteenSeventySeven,
      kelvin: effects.kelvin,
      enhance: effects.enhance,
      grayscale: effects.grayscale,
      sepia: effects.sepia,
      luminance: effects.luminance,
      opacity: effects.opacity,
      brighten: effects.brighten,
      darken: effects.darken,
      threshold: effects.threshold,
      negaposi: effects.negaposi,
      brightnesscontrast: effects.brightnessContrast,
      huerotate: effects.hueRotate,
      saturate: effects.saturate,
      horizontalflip: effects.horizontalFlip,
      verticalflip: effects.verticalFlip,
      doubleflip: effects.doubleFlip,
      horizontalmirror: effects.horizontalMirror,
      verticalmirror: effects.verticalMirror,
      xymirror: effects.XYMirror,
    };
  }

  /**
   * Get all supported effect types
   *
   * @returns {Array|string[]} - supported effect types
   */
  getSupportedEffects() {
    return Object.keys(this.effectMap);
  }

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

    const func = this.effectMap[effect.toLowerCase()];
    if (func === undefined) {
      throw new Error(`${effect} is not supported.`);
    }

    imageData.data = func.apply(this, [imageData, options]);
    if (convertResult.context) {
      convertResult.context.putImageData(imageData, 0, 0);
      return canvas.getBase64(convertResult.canvas);
    }
    return imageData;
  }
}

module.exports = Filter;
