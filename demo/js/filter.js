Filter = {};
Filter.process = function(img){
  var
    context,
    pixels,
    worker,
    obj = {},
    effect = img.dataset.effect
  ;

  // extract pixels data
  pixels = Filter.canvas.getPixels(img);

  // send the pixels to a worker thread
  worker = new Worker('js/worker.js');
  obj = {
    pixels: pixels,
    effects: effect
  };
  worker.postMessage(obj);

  // get message from the worker thread
  worker.onmessage = function(e){
    // debug
    if (typeof e.data === "string"){
      console.log("Worker: " + e.data);
      return;
    }
    Filter.canvas.renderCanvas(img, e.data.pixels);
  };
  return;
};

Filter.smoothScroll = function() {
  $('a[href^=#]').on('click', function(){
      // scroll speed
      var speed = 400;
      // get anchor-tag value
      var href = $(this).attr('href');
      // get target
      var target = $(href == '#' || href == '' ? 'html' : href);
      // get target position
      var position = target.offset().top;
      // smooth scroll
      $('body, html').animate({scrollTop:position}, speed, 'swing');
      return false;
  });
};

(window.onload = function(){
  Array.prototype.forEach.call(document.querySelectorAll('.main-article-img'), function(node){
    Filter.process(node);
  });

  Filter.smoothScroll();
})();