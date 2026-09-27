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
  style?: StyleProp<ViewStyle>;
}

export function RqllyPressable({
  children,
  pressedScale =
    motion.scale.pressed,
  style,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: RqllyPressableProps) {
  const scale = useRef(
    new Animated.Value(1),
  ).current;

  const animateTo = (
    value: number,
  ) => {
    if (disabled) {
      return;
    }

    Animated.spring(scale, {
      toValue: value,
      ...motion.spring.press,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPressIn={(event) => {
        animateTo(pressedScale);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1);
        onPressOut?.(event);
      }}
      style={style}
    >
      <Animated.View
        style={{
          width: '100%',
          transform: [
            { scale },
          ],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}