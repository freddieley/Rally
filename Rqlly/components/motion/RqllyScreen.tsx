import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { motion } from './motion';

interface RqllyScreenProps {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  distance?: number;
  disabled?: boolean;
}

export function RqllyScreen({
  children,
  delay = motion.delay.none,
  style,
  distance = motion.distance.normal,
  disabled = false,
}: RqllyScreenProps) {
  const opacity = useRef(
    new Animated.Value(disabled ? 1 : 0),
  ).current;

  const translateY = useRef(
    new Animated.Value(
      disabled ? 0 : distance,
    ),
  ).current;

  const scale = useRef(
    new Animated.Value(
      disabled
        ? 1
        : motion.scale.entrance,
    ),
  ).current;

  useEffect(() => {
    if (disabled) {
      opacity.setValue(1);
      translateY.setValue(0);
      scale.setValue(1);
      return;
    }

    opacity.setValue(0);
    translateY.setValue(distance);
    scale.setValue(motion.scale.entrance);

    const opacityAnimation =
      Animated.timing(opacity, {
        toValue: 1,
        duration: motion.duration.entrance,
        delay,
        easing: Easing.out(
          Easing.cubic,
        ),
        useNativeDriver: true,
      });

    const movementAnimation =
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          delay,
          ...motion.spring.entrance,
          useNativeDriver: true,
        }),

        Animated.spring(scale, {
          toValue: 1,
          delay,
          ...motion.spring.entrance,
          useNativeDriver: true,
        }),
      ]);

    const animation =
      Animated.parallel([
        opacityAnimation,
        movementAnimation,
      ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    delay,
    disabled,
    distance,
    opacity,
    scale,
    translateY,
  ]);

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          opacity,
          transform: [
            { translateY },
            { scale },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}