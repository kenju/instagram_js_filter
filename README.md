# `instagram_js_filter` [![npm version](https://badge.fury.io/js/instagram_js_filter.svg)](https://badge.fury.io/js/instagram_js_filter) [![wercker status](https://app.wercker.com/status/e6caf22ff7d1672011a269462edcb19a/s/master "wercker status")](https://app.wercker.com/project/byKey/e6caf22ff7d1672011a269462edcb19a)
[![NPM](https://nodei.co/npm/instagram_js_filter.png?compact=true)](https://npmjs.org/package/instagram_js_filter) 

> Instagram-Like Image Processing Web API

**Instagram JS Filter** is a JS libary for realising Instagram Filters on the web.

* [Demo](https://kenju.github.io/instagram_js_filter)
* [API Documentation](https://kenju.github.io/instagram_js_filter_doc/)

## Install

```bash
$ npm install instagram_js_filter
```

## Example

```javascript
const filter = require('instagram_js_filter');

const imagePath = path.join(__dirname + image);
fs.readFile(imagePath, (err, imageBuffer) => {
    if (err) {
        reject(err);
    }
    const options = {};
    const base64 = app.filter(imageBuffer, 'horizontalflip', options);
    console.log(base64);
});
```

## Supported Effects

- Instagram filters
	- lark
	- reyes
	- juno
	- slumber
	- crema
	- ludwig
	- aden
	- perpetua
	- amaro
	- mayfair
	- rise
	- hudson
	- valencia
	- xpro2
	- sierra
	- willow
	- lofi
	- earlybird
	- brannan
	- inkwell
	- hefe
	- nashville
	- sutro
	- toaster
	- walden
	- nineteenSeventySeven
	- kelvin
- Basic filters
	- grayscale
	- sepia
	- luminance
	- brighten
	- darken
	- opacity
	- negaposi
	- brightnessContrast
	- huerotate
	- saturate
	- horizontalFlip
	- verticalFlip
	- doubleFlip
	- horizontalMirror
	- verticalMirror
	- XYMirror

# License

Created by and copyright Kenju Wagatsuma Released 
under the [MIT license](https://github.com/kenju/instagram_js_filter/blob/master/LICENSE).