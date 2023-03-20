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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DEFAULT_FALL_SPEED = exports.DEFAULT_EXPLOSION_SPEED = exports.DEFAULT_COLORS = exports.TOP_MIN = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var confetti_1 = require("./components/confetti");
var utils_1 = require("./utils");
exports.TOP_MIN = 0.7;
exports.DEFAULT_COLORS = [
    '#e67e22',
    '#2ecc71',
    '#3498db',
    '#84AAC2',
    '#E6D68D',
    '#F67933',
    '#42A858',
    '#4F50A2',
    '#A86BB7',
    '#e74c3c',
    '#1abc9c'
];
exports.DEFAULT_EXPLOSION_SPEED = 350;
exports.DEFAULT_FALL_SPEED = 3000;
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { items: [], showItems: false };
        _this.sequence = null;
        _this.animation = new react_native_1.Animated.Value(0);
        _this.componentDidMount = function () {
            var _a = _this.props, _b = _a.autoStart, autoStart = _b === void 0 ? true : _b, _c = _a.autoStartDelay, autoStartDelay = _c === void 0 ? 0 : _c;
            if (autoStart) {
                if (autoStartDelay) {
                    setTimeout(_this.start, autoStartDelay);
                }
                else {
                    _this.start();
                }
            }
        };
        _this.componentDidUpdate = function (_a) {
            var prevCount = _a.count, _b = _a.colors, prevColors = _b === void 0 ? exports.DEFAULT_COLORS : _b;
            var _c = _this.props, count = _c.count, _d = _c.colors, colors = _d === void 0 ? exports.DEFAULT_COLORS : _d;
            if (count !== prevCount || colors !== prevColors) {
                _this.setState({
                    items: _this.getItems(prevColors)
                });
            }
        };
        _this.getItems = function (prevColors) {
            var _a = _this.props, count = _a.count, _b = _a.colors, colors = _b === void 0 ? exports.DEFAULT_COLORS : _b;
            var items = _this.state.items;
            var difference = items.length < count ? count - items.length : 0;
            var newItems = Array(difference).fill({}).map(function () { return ({
                leftDelta: (0, utils_1.randomValue)(0, 1),
                topDelta: (0, utils_1.randomValue)(exports.TOP_MIN, 1),
                swingDelta: (0, utils_1.randomValue)(0.2, 1),
                speedDelta: {
                    rotateX: (0, utils_1.randomValue)(0.3, 1),
                    rotateY: (0, utils_1.randomValue)(0.3, 1),
                    rotateZ: (0, utils_1.randomValue)(0.3, 1)
                },
                color: (0, utils_1.randomColor)(colors)
            }); });
            return items
                .slice(0, count)
                .concat(newItems)
                .map(function (item) { return (__assign(__assign({}, item), { color: prevColors !== colors ? (0, utils_1.randomColor)(colors) : item.color })); });
        };
        _this.start = function (resume) {
            if (resume === void 0) { resume = false; }
            _this.setState({ showItems: true }, function () {
                var _a = _this.props, _b = _a.explosionSpeed, explosionSpeed = _b === void 0 ? exports.DEFAULT_EXPLOSION_SPEED : _b, _c = _a.fallSpeed, fallSpeed = _c === void 0 ? exports.DEFAULT_FALL_SPEED : _c, onAnimationStart = _a.onAnimationStart, onAnimationResume = _a.onAnimationResume, onAnimationEnd = _a.onAnimationEnd;
                if (resume) {
                    onAnimationResume && onAnimationResume();
                }
                else {
                    _this.sequence = react_native_1.Animated.sequence([
                        react_native_1.Animated.timing(_this.animation, { toValue: 0, duration: 0, useNativeDriver: true }),
                        react_native_1.Animated.timing(_this.animation, {
                            toValue: 1,
                            duration: explosionSpeed,
                            easing: react_native_1.Easing.out(react_native_1.Easing.quad),
                            useNativeDriver: true
                        }),
                        react_native_1.Animated.timing(_this.animation, {
                            toValue: 2,
                            duration: fallSpeed,
                            easing: react_native_1.Easing.quad,
                            useNativeDriver: true
                        }),
                    ]);
                    onAnimationStart && onAnimationStart();
                }
                _this.sequence && _this.sequence.start(function (_a) {
                    var finished = _a.finished;
                    if (finished) {
                        onAnimationEnd && onAnimationEnd();
                        _this.setState({ showItems: false });
                    }
                });
            });
        };
        _this.resume = function () { return _this.start(true); };
        _this.stop = function () {
            var onAnimationStop = _this.props.onAnimationStop;
            onAnimationStop && onAnimationStop();
            _this.sequence && _this.sequence.stop();
        };
        var _a = props.colors, colors = _a === void 0 ? exports.DEFAULT_COLORS : _a;
        _this.start = _this.start.bind(_this);
        _this.resume = _this.resume.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.state.items = _this.getItems(colors);
        return _this;
    }
    Explosion.prototype.render = function () {
        var _this = this;
        var _a = this.props, origin = _a.origin, fadeOut = _a.fadeOut, topDeltaAdjustment = _a.topDeltaAdjustment, dontAnimateOpacity = _a.dontAnimateOpacity;
        var _b = this.state, items = _b.items, showItems = _b.showItems;
        var _c = react_native_1.Dimensions.get('window'), height = _c.height, width = _c.width;
        if (!showItems) {
            return null;
        }
        return (<React.Fragment>
        {items.map(function (item, index) {
                var left = _this.animation.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [origin.x, item.leftDelta * width, item.leftDelta * width]
                });
                var top = _this.animation.interpolate({
                    inputRange: [0, 1, 1 + item.topDelta, 2],
                    outputRange: [-origin.y, -item.topDelta * height, (-item.topDelta * height) + ((topDeltaAdjustment || 0) / 2), (-item.topDelta * height) + (topDeltaAdjustment || 0)]
                });
                var rotateX = _this.animation.interpolate({
                    inputRange: [0, 2],
                    outputRange: ['0deg', "".concat(item.speedDelta.rotateX * 360 * 10, "deg")]
                });
                var rotateY = _this.animation.interpolate({
                    inputRange: [0, 2],
                    outputRange: ['0deg', "".concat(item.speedDelta.rotateY * 360 * 5, "deg")]
                });
                var rotateZ = _this.animation.interpolate({
                    inputRange: [0, 2],
                    outputRange: ['0deg', "".concat(item.speedDelta.rotateZ * 360 * 2, "deg")]
                });
                var translateX = _this.animation.interpolate({
                    inputRange: [0, 0.4, 1.2, 2],
                    outputRange: [0, -(item.swingDelta * 30), (item.swingDelta * 30), 0]
                });
                var opacity = _this.animation.interpolate({
                    inputRange: [0, 1, 1.8, 2],
                    outputRange: [1, 1, 1, fadeOut ? 0 : 1]
                });
                var containerTransform = [{ translateX: left }, { translateY: top }];
                var transform = [
                    { rotateX: rotateX }, { rotateY: rotateY }, { rotate: rotateZ }, { translateX: translateX }
                ];
                if (react_native_1.Platform.OS === 'android') {
                    transform.push({ perspective: 100 });
                }
                return (<confetti_1.default color={item.color} containerTransform={containerTransform} transform={transform} opacity={dontAnimateOpacity ? undefined : opacity} key={index} testID={"confetti-".concat(index + 1)}/>);
            })}
      </React.Fragment>);
    };
    return Explosion;
}(React.Component));
exports["default"] = Explosion;
