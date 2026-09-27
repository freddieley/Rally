import React, {
  useRef,
} from 'react';

import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { motion } from './motion';

interface RqllyPressableProps
  extends Omit<
    PressableProps,
    'style'
  > {
  children: React.ReactNode;

  pressedScale?: number;
  hoverScale?: number;
  hoverLift?: number;

  style?: StyleProp<ViewStyle>;
}

export function RqllyPressable({
  children,

  pressedScale =
    motion.scale.pressed,

  hoverScale =
    motion.scale.hover,

  hoverLift =
    motion.hover.lift,

  style,

  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,

  disabled,

  ...props
}: RqllyPressableProps) {
  const hover = useRef(
    new Animated.Value(0),
  ).current;

  const pressed = useRef(
    new Animated.Value(0),
  ).current;

  const animateHover = (
    value: number,
  ) => {
    if (disabled) {
      return;
    }

    Animated.spring(hover, {
      toValue: value,
      ...motion.spring.hover,
      useNativeDriver: true,
    }).start();
  };

  const animatePress = (
    value: number,
  ) => {
    if (disabled) {
      return;
    }

    Animated.spring(pressed, {
      toValue: value,
      ...motion.spring.press,
      useNativeDriver: true,
    }).start();
  };

  const hoverScaleValue =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [1, hoverScale],
    });

  const pressedScaleValue =
    pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [1, pressedScale],
    });

  const hoverLiftValue =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [0, hoverLift],
    });

  const pressLiftValue =
    pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  return (
    <Pressable
      {...props}
      disabled={disabled}

      onHoverIn={(event) => {
        animateHover(1);
        onHoverIn?.(event);
      }}

      onHoverOut={(event) => {
        animateHover(0);
        onHoverOut?.(event);
      }}

      onPressIn={(event) => {
        animatePress(1);
        onPressIn?.(event);
      }}

      onPressOut={(event) => {
        animatePress(0);
        onPressOut?.(event);
      }}

      style={style}
    >
      <Animated.View
        style={{
          width: '100%',

          transform: [
            {
              scale:
                Animated.multiply(
                  hoverScaleValue,
                  pressedScaleValue,
                ),
            },
            {
              translateY:
                Animated.add(
                  hoverLiftValue,
                  pressLiftValue,
                ),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}