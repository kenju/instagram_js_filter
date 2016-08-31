const process = (img) => {
    const effect = img.dataset.effect;

    // extract pixels data
    const pixels = Filter.canvas.getPixels(img);

    // send the pixels to a worker thread
    const worker = new Worker('js/worker.js');
    const obj = {
        pixels: pixels,
        effects: effect
    };
    worker.postMessage(obj);

    // get message from the worker thread
    worker.onmessage = function (e) {
        // debug
        if (typeof e.data === "string") {
            console.log("Worker: " + e.data);
            return;
        }
        Filter.canvas.renderCanvas(img, e.data.pixels);
    };
};

(window.onload = function () {
    Array.prototype.forEach.call(document.querySelectorAll('.main-article-img'), function (node) {
        Filter.process(node);
    });

    Filter.smoothScroll();
})();