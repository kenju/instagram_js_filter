/**
 * object.js
 */

module.exports.clone = (obj) => {
    let copy;

    if (obj === null || obj !== typeof 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        Object.keys(obj).forEach(attr => {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = this.clone(obj[attr]);
            }
        });
        return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
};

