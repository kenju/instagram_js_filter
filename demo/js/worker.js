Worker = {};

onmessage = function(e){
  postMessage(Worker.process(e.data))
};

Worker.process = function(imgd){
  var
    effect  = imgd.effects, // effect name
    pixraw  = imgd.pixels,  // context.getImageData()
    pix     = pixraw.data,  // image data (pixels)
    width   = pixraw.width,
    height  = pixraw.height
  ;

  importScripts(
    'worker.filter.js',
    'worker.util.js',
    'lagrange.js'
  );

  switch(effect){
    case 'lark':
      Worker.filter.lark(pix);
      break;
    case 'reyes':
      Worker.filter.reyes(pix);
      break;
    case 'juno':
      Worker.filter.juno(pix);
      break;
    case 'slumber':
      Worker.filter.slumber(pix);
      break;
    case 'crema':
      Worker.filter.crema(pix);
      break;
    case 'ludwig':
      Worker.filter.ludwig(pix);
      break;
    case 'aden':
      Worker.filter.aden(pix);
      break;
    case 'perpetua':
      Worker.filter.perpetua(pix);
      break;
    case 'amaro':
      Worker.filter.amaro(pix);
      break;
    case 'mayfair':
      Worker.filter.mayfair(pix);
      break;
    case 'rise':
      Worker.filter.rise(pix);
      break;
    case 'hudson':
      Worker.filter.hudson(pix);
      break;
    case 'valencia':
      Worker.filter.valencia(pix);
      break;
    case 'xpro2':
      Worker.filter.xpro2(pix);
      break;
    case 'sierra':
      Worker.filter.sierra(pix);
      break;
    case 'willow':
      Worker.filter.willow(pix);
      break;
    case 'lofi':
      Worker.filter.lofi(pix);
      break;
    case 'earlybird':
      Worker.filter.earlybird(pix);
      break;
    case 'brannan':
      Worker.filter.brannan(pix);
      break;
    case 'inkwell':
      Worker.filter.inkwell(pix);
      break;
    case 'hefe':
      Worker.filter.hefe(pix);
      break;
    case 'nashville':
      Worker.filter.nashville(pix);
      break;
    case 'sutro':
      Worker.filter.sutro(pix);
      break;
    case 'toaster':
      Worker.filter.toaster(pix);
      break;
    case 'walden':
      Worker.filter.walden(pix);
      break;
    case 'nineteenSeventySeven':
      Worker.filter.nineteenSeventySeven(pix);
      break;
    case 'kelvin':
      Worker.filter.kelvin(pix);
      break;
    case 'grayscale':
      Worker.filter.grayscale(pix);
      break;
    case 'sepia':
      Worker.filter.sepia(pix);
      break;
    case 'luminance':
      Worker.filter.luminance(pix);
      break;
    case 'brighten':
      Worker.filter.brighten(pix, 50);
      break;
    case 'darken':
      Worker.filter.darken(pix, 50);
      break;
    case 'opacity':
      Worker.filter.opacity(pix, 0.5);
      break;
    case 'threshold':
      Worker.filter.threshold(pix);
      break;
    case 'negaposi':
      Worker.filter.negaposi(pix);
      break;
    case 'brightnesscontrast':
      Worker.filter.brightnessContrast(pix, -0.08, 1.5);
      break;
    case 'huerotate':
      Worker.filter.hueRotate(pix, 45);
      break;
    case 'saturate':
      Worker.filter.saturate(pix, 20);
      break;
    case 'horizontalflip':
      Worker.filter.horizontalFlip(pix, width, height);
      break;
    case 'verticalflip':
      Worker.filter.verticalFlip(pix, width, height);
      break;
    case 'doubleflip':
      Worker.filter.doubleFlip(pix);
      break;
    case 'horizontalmirror':
      Worker.filter.horizontalMirror(pix, width, height);
      break;
    case 'verticalmirror':
      Worker.filter.verticalMirror(pix, width, height);
      break;
    case 'xymirror':
      Worker.filter.XYMirror(pix);
      break;
    default:
      Worker.filter.enhance(pix);
      break;
  }
  imgd['pixels'].data = pix;
  return imgd;
};


