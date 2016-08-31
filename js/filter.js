Filter = {};
Filter.process = function (img) {
    var pixels;
    var worker;
    var obj;
    var effect = img.dataset.effect;

    pixels = Filter.canvas.getPixels(img);
    worker = new Worker('js/worker.js');
    obj = {
        pixels: pixels,
        effects: effect
    };
    worker.postMessage(obj);
    worker.onmessage = function (e) {
        Filter.canvas.renderCanvas(img, e.data.pixels);
    };
};

(window.onload = function () {
    Array.prototype.forEach.call(document.querySelectorAll('.main-article-img'), function (node) {
        Filter.process(node);
    });
    Filter.smoothScroll();
})();