import React, {
  useRef,
} from 'react';

import {
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

import { motion } from './motion';

interface RqllyPressableProps
  extends PressableProps {
  children: React.ReactNode;
  pressedScale?: number;
}

export function RqllyPressable({
  children,
  pressedScale = motion.scale.pressed,
  style,
  ...props
}: RqllyPressableProps) {
  const scale = useRef(
    new Animated.Value(1),
  ).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      damping: 18,
      stiffness: 300,
      mass: 0.5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      {...props}
      onPressIn={(event) => {
        animateTo(pressedScale);
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1);
        props.onPressOut?.(event);
      }}
      style={style}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});