const getPixels = (img) => {
    const canvas = Filter.canvas.getCanvas(img.width, img.height);
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
};

const getCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};

const renderCanvas = (img, new_pixels) => {
    const canvas = Filter.canvas.getCanvas(img.width, img.height);
    const context = canvas.getContext("2d");
    context.putImageData(new_pixels, 0, 0);
    img.src = canvas.toDataURL();
    return;
};

module.exports = {
    getPixels,
    getCanvas,
    renderCanvas
};