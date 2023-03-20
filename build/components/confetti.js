"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_native_1 = require("react-native");
var utils_1 = require("../utils");
var Confetti = /** @class */ (function (_super) {
    __extends(Confetti, _super);
    function Confetti() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = (0, utils_1.randomValue)(8, 16);
        _this.height = (0, utils_1.randomValue)(6, 12);
        _this.isRounded = Math.round((0, utils_1.randomValue)(0, 1)) === 1;
        return _this;
    }
    Confetti.prototype.render = function () {
        var _a = this.props, containerTransform = _a.containerTransform, transform = _a.transform, opacity = _a.opacity, color = _a.color;
        var _b = this, width = _b.width, height = _b.height, isRounded = _b.isRounded;
        var containerStyle = { transform: containerTransform };
        var style = { width: width, height: height, backgroundColor: color, transform: transform, opacity: opacity };
        return (<react_native_1.Animated.View pointerEvents="none" renderToHardwareTextureAndroid={true} style={[styles.confetti, containerStyle]}>
        <react_native_1.Animated.View style={[isRounded && styles.rounded, style]}/>
      </react_native_1.Animated.View>);
    };
    return Confetti;
}(React.PureComponent));
var styles = react_native_1.StyleSheet.create({
    confetti: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    rounded: {
        borderRadius: 100
    }
});
exports["default"] = Confetti;
