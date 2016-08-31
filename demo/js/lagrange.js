Lagrange = {};

/**
 * At least two points are needed to interpolate something.
 * @class Lagrange polynomial interpolation.
 * The computed interpolation polynomial will be reffered to as L(x).
 * @example
 * var l = new Lagrange(0, 0, 1, 1);
 * var index = l.addPoint(0.5, 0.8);
 * console.log(l.valueOf(0.1));
 *
 * l.changePoint(index, 0.5, 0.1);
 * console.log(l.valueOf(0.1));
 *
 * @see https://gist.github.com/dburner/8550030
 * @see http://jsfiddle.net/maccesch/jgU3Y/
 */
var Lagrange = function(x1, y1, x2, y2) {
  this.xs = [x1, x2];
  this.ys = [y1, y2];
  this.ws = [];
  this._updateWeights();
};
/**
 * Adds a new point to the polynomial. L(x) = y
 * @return {Number} The index of the added point. Used for changing the point. See changePoint.
 */
Lagrange.prototype.addPoint = function(x, y) {
  this.xs.push(x);
  this.ys.push(y);
  this._updateWeights();
  return this.xs.length-1;
};
/**
 * Recalculate barycentric weights.
 */
Lagrange.prototype._updateWeights = function() {
  var len = this.xs.length; // the number of points
  var weight;
  for (var j = 0; j < len; ++j) {
    weight = 1;
    for (var i = 0; i < len; ++i) {
      if (i != j) {
        weight *= this.xs[j] - this.xs[i];
      }
    }
    this.ws[j] = 1/weight;
  }
};
/**
 * Calculate L(x)
 */
Lagrange.prototype.valueOf = function(x) {
  var a = 0;
  var b = 0;
  var c = 0;
  for (var j = 0; j < this.xs.length; ++j) {
    if (x != this.xs[j]) {
      a = this.ws[j] / (x - this.xs[j]);
      b += a * this.ys[j];
      c += a;
    } else {
      return this.ys[j];
    }
  }
  return b / c;
};

Lagrange.prototype.addMultiPoints = function(arr){
  for(var i = 0, n = arr.length; i < n; i++){
    if(arr[i][0] !== 0 && arr[i][0] !== 1){
      this.addPoint(arr[i][1], arr[i][2]);
    }
  }
};
