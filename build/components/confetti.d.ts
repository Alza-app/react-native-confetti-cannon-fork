import * as React from "react";
import { Animated } from 'react-native';
import { MatrixTransform, PerpectiveTransform, RotateTransform, RotateXTransform, RotateYTransform, RotateZTransform, ScaleTransform, ScaleXTransform, ScaleYTransform, SkewXTransform, SkewYTransform, TranslateXTransform, TranslateYTransform } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import AnimatedInterpolation = Animated.AnimatedInterpolation;
import WithAnimatedArray = Animated.WithAnimatedArray;
export type TransformStyles = PerpectiveTransform | RotateTransform | RotateXTransform | RotateYTransform | RotateZTransform | ScaleTransform | ScaleXTransform | ScaleYTransform | TranslateXTransform | TranslateYTransform | SkewXTransform | SkewYTransform | MatrixTransform;
type Props = {
    containerTransform: WithAnimatedArray<TransformStyles>;
    transform: WithAnimatedArray<TransformStyles>;
    color: string;
    opacity?: number | AnimatedInterpolation<number>;
    testID?: string;
};
declare class Confetti extends React.PureComponent<Props> {
    width: number;
    height: number;
    isRounded: boolean;
    render(): JSX.Element;
}
export default Confetti;
//# sourceMappingURL=confetti.d.ts.map