Worker.util = {};

Worker.util.clone = function(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = Worker.util.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

Worker.util.getUnit8Array = function(len) {
  return new Uint8Array(len);
};


Worker.util.identityLUT = function() {
  var lut = Worker.util.getUnit8Array(256);
  for (var i=0; i<lut.length; i++) {
    lut[i] = i;
  }
  return lut;
};

// apply LUT(Look-Up-Table)
Worker.util.applyLUT = function(pix, lut) {
  var
    i,
    pix_result  = Worker.util.clone(pix), // clone objects, and not shallow copy nor reference
    red         = lut.red,
    green       = lut.green,
    blue        = lut.blue,
    alpha       = lut.alpha,
    len         = pix.length
  ;
  for (i = 0; i < len; i+=4) {
    pix[i]   = red[pix_result[i]];
    pix[i+1] = green[pix_result[i+1]];
    pix[i+2] = blue[pix_result[i+2]];
    pix[i+3] = alpha[pix_result[i+3]];
  }
};

// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
Worker.util.rgb2hsl = function(r, g, b){
  var max, min, h, s, l, diff;

  r = r/255;
  g = g/255;
  b = b/255;

  max = Math.max(r, g, b);
  min = Math.min(r, g, b);

  if (max === min) {
    h = s = 0; //achromatic
  } else {
    diff = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r -g ) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

Worker.util.hsl2rgb = function(h, s, v){
  var r, g, b, q, p;

  if( s === 0 ){
    r = g = b = l; //achromatic
  } else {
    q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    p = 2 * l - q;
    r = this.hue2rgb(p, q, h + 1/3);
    g = this.hue2rgb(p, q, h);
    b = this.hue2rgb(p, q, h - 1/3);
  }
  return [r * 255, g * 255, b * 255];
};

Worker.util.hue2rgb = function(p, q, t){
  switch(t){
    case t < 0 :
      t += 1;
      break;
    case t > 1 :
      t -= 1;
      break;
    case t < 1/6 :
      return p + (q - p) * 6 * t;
    case t < 1/2 :
      return q;
    case t < 2/3 :
      return p + (q - p) * (2/3 - t) * 6;
      return p;
  }
};

Worker.util.rgb2hsv = function(r, g, b){
  var max, min, h, s, v, diff;
  r = r/255;
  g = g/255;
  b = b/255;

  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  v = max; // value

  diff = max - min;
  s = max === 0 ? 0 : diff/max;

  if(max === min){
    h = 0; //achromatic
  }else{
    switch(max){
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

Worker.util.hsv2rgb = function(h, s, v){
  var r, g, b, i, f, p, q, t;

  i = Math.floor(h * 6); // iterator
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch(i % 6){
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
