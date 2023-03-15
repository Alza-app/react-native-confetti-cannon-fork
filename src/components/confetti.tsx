import * as React from "react";
import { Animated, StyleSheet } from 'react-native';

import { randomValue } from '../utils';
import {
  MatrixTransform,
  PerpectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  TranslateXTransform,
  TranslateYTransform
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import AnimatedInterpolation = Animated.AnimatedInterpolation;
import WithAnimatedArray = Animated.WithAnimatedArray;

export type TransformStyles = PerpectiveTransform
  | RotateTransform
  | RotateXTransform
  | RotateYTransform
  | RotateZTransform
  | ScaleTransform
  | ScaleXTransform
  | ScaleYTransform
  | TranslateXTransform
  | TranslateYTransform
  | SkewXTransform
  | SkewYTransform
  | MatrixTransform;

type Props = {
  containerTransform: WithAnimatedArray<TransformStyles>;
  transform: WithAnimatedArray<TransformStyles>;
  color: string;
  opacity?: number | AnimatedInterpolation<number>;
  testID?: string;
};

class Confetti extends React.PureComponent<Props> {
  width: number = randomValue(8, 16);
  height: number = randomValue(6, 12);
  isRounded: boolean = Math.round(randomValue(0, 1)) === 1;

  render() {
    const { containerTransform, transform, opacity, color } = this.props;
    const { width, height, isRounded } = this;
    const containerStyle = { transform: containerTransform };
    const style = { width, height, backgroundColor: color, transform, opacity };

    return (
      <Animated.View
        pointerEvents="none"
        renderToHardwareTextureAndroid={true}
        style={[styles.confetti, containerStyle]}>
        <Animated.View style={[isRounded && styles.rounded, style]}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  rounded: {
    borderRadius: 100
  }
});

export default Confetti;
