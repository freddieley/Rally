import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { motion } from './motion';

interface RqllyScreenProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle | ViewStyle[];
  distance?: number;
}

export function RqllyScreen({
  children,
  delay = 0,
  style,
  distance = motion.distance.normal,
}: RqllyScreenProps) {
  const opacity = useRef(
    new Animated.Value(0),
  ).current;

  const translateY = useRef(
    new Animated.Value(distance),
  ).current;

  const scale = useRef(
    new Animated.Value(motion.scale.entrance),
  ).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: motion.duration.entrance,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.spring(translateY, {
        toValue: 0,
        delay,
        damping: 19,
        stiffness: 180,
        mass: 0.8,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        delay,
        damping: 19,
        stiffness: 180,
        mass: 0.8,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    delay,
    distance,
    opacity,
    scale,
    translateY,
  ]);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          opacity,
          transform: [
            { translateY },
            { scale },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});