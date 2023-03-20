"use strict";
// @flow
exports.__esModule = true;
exports.randomColor = exports.randomValue = void 0;
var randomValue = function (min, max) {
    return Math.random() * (max - min) + min;
};
exports.randomValue = randomValue;
var randomColor = function (colors) {
    return colors[Math.round((0, exports.randomValue)(0, colors.length - 1))];
};
exports.randomColor = randomColor;
