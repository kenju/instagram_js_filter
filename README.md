# About

**Instagram JS Filter** is a JS libary for realising Instagram Filters on the web.

> Instagram-Like Image Processing Web API

* [Demo](https://kenju.github.io/instagram_js_filter)
* [API Documentation](https://github.com/kenju/instagram_css_filter/blob/master/out)

## Tech-background

As for image-processing, `canvas` is used for generating filtered images. 
RGB + alpha valus of each pixels of an image is converted for the targeted effects.

Such image-processing requires high memory-usage and could block user-experience, 
therefore `Web Worker API` is used for realising multi-thread processing in the client side.

# Install

```bash
$ npm install instagram_js_filter
```

# Example

```javascript
const filter = require('instagram_js_filter');

const imagePath = path.join(__dirname + '/../demo/img/sample.jpg');
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