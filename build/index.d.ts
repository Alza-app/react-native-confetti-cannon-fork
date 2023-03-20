import * as React from 'react';
import { Animated } from 'react-native';
import CompositeAnimation = Animated.CompositeAnimation;
type Props = {
    count: number;
    origin: {
        x: number;
        y: number;
    };
    explosionSpeed?: number;
    fallSpeed?: number;
    colors?: Array<string>;
    fadeOut?: boolean;
    autoStart?: boolean;
    autoStartDelay?: number;
    onAnimationStart?: () => void;
    onAnimationResume?: () => void;
    onAnimationStop?: () => void;
    onAnimationEnd?: () => void;
    testID?: string;
    topDeltaAdjustment?: number;
    dontAnimateOpacity?: boolean;
};
type Item = {
    leftDelta: number;
    topDelta: number;
    swingDelta: number;
    speedDelta: {
        rotateX: number;
        rotateY: number;
        rotateZ: number;
    };
    color: string;
};
type State = {
    items: Item[];
    showItems: boolean;
};
export declare const TOP_MIN = 0.7;
export declare const DEFAULT_COLORS: Array<string>;
export declare const DEFAULT_EXPLOSION_SPEED = 350;
export declare const DEFAULT_FALL_SPEED = 3000;
declare class Explosion extends React.Component<Props, State> {
    state: State;
    sequence: CompositeAnimation | null;
    animation: Animated.Value;
    constructor(props: Props);
    componentDidMount: () => void;
    componentDidUpdate: ({ count: prevCount, colors: prevColors }: Props) => void;
    getItems: (prevColors: Array<string>) => Array<Item>;
    start: (resume?: boolean) => void;
    resume: () => void;
    stop: () => void;
    render(): JSX.Element | null;
}
export default Explosion;
//# sourceMappingURL=index.d.ts.map