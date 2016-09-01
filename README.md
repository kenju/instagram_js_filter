# About

**Instagram JS Filter** is a JS libary for realising Instagram Filters on the web.

> Instagram-Like Image Processing Web API

## Demo

http://kenju.github.io/instagram_js_filter

## Tech-background

As for image-processing, `canvas` is used for generating filtered images. 
RGB + alpha valus of each pixels of an image is converted for the targeted effects.

Such image-processing requires high memory-usage and could block user-experience, 
therefore `Web Worker API` is used for realising multi-thread processing in the client side.

# Install

## NPM

```bash
$ npm install instagram_js_filter
```

## Bower

```bash
$ bower install instagram_js_filter
```

## Or Manually Download

Downloads zipped files from [the Github repository](https://github.com/KENJU/instagram_css_filter/tree/master/dist).

# Usage

## A. Server-side

This module required to get canvas ImageData as an argument.

```javascript
const Canvas = require('canvas');
const Image = Canvas.Image;
const filter = require('instagram_js_filter');

const image = new Image;
image.src = data;
const canvas = new Canvas(image.width, image.height);
const context = canvas.getContext('2d');
context.drawImage(image, 0, 0, image.width, image.height);
const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

filter.grayscale(imageData)
    .then(newImageData => {
        context.putImageData(newImageData, 0, 0);
        return canvas.toDataURL().split(',')[1];
    })
    .then(base64 => {
        console.log(base64);
    })
```

## B. Client-side

### Downloads JS files

What you need is these files in `js` directory in [the GitHub reposizoty](https://github.com/KENJU/instagram_js_filter/tree/master/demo/js).

- `filter.js` - main script file
- `filter.canvas.js` - e.g. creates canvas
    - `worker.filter.js` - supplies all effects
    - `worker.js` - convert rgb values in background thread
    - `worker.util.js` - e.g. converts between rgb and hsl
    - `lagrange.js` - calculate rgb based on lagrange's interpolating function for achieving instagram filter effects

Then, import below 2 scripts.
Therefore, **all scripts file should be in the same diretory** (unless you overwrite raw codes);

```html
<script src="js/filter.js"></script>
<script src="js/filter.canvas.js"></script>
```

Finally, add `data-effect="?"` attributes to `<img>` tags which you want to apply the filters.

```html
<img data-effect="lark" src="img/sample.jpg" alt="">
```

## Available effects

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
under the [MIT license](https://github.com/KENJU/instagram_css_filter/blob/master/LICENSE).