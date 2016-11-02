# `instagram_js_filter` [![npm version](https://badge.fury.io/js/instagram_js_filter.svg)](https://badge.fury.io/js/instagram_js_filter) [![wercker status](https://app.wercker.com/status/e6caf22ff7d1672011a269462edcb19a/s/master "wercker status")](https://app.wercker.com/project/byKey/e6caf22ff7d1672011a269462edcb19a)
[![NPM](https://nodei.co/npm/instagram_js_filter.png?compact=true)](https://npmjs.org/package/instagram_js_filter) 

> Instagram-Like Image Processing Web API

**Instagram JS Filter** is a Node.js library for image-processing library.

* [Demo](https://kenju.github.io/instagram_js_filter)
* [Example](https://github.com/kenju/instagram_js_filter/tree/master/example)
* [API Documentation](https://kenju.github.io/instagram_js_filter_doc/)

## Install

```bash
$ npm install instagram_js_filter
```

## Example

```javascript
const filter = require('instagram_js_filter');

const saveFile = (outPath, buffer) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(outPath);
        });
    });
};

const imagePath = path.join(__dirname + image);
const type = 'hudson';

convert(imagePath, type, {})
    .then(base64 => {
        const buffer = new Buffer(base64, 'base64');
        const outPath = path.join(__dirname + '/../out/' + type + '.out.jpg');
        return saveFile(outPath, buffer);
    })
    .then(savedPath => {
        console.log(savedPath);
    })
    .catch(err => {
        console.log(err);
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