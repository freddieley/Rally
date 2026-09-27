import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

import {
  colors,
} from '../ui/tokens';

interface AuthBackgroundProps {
  variant?: 'welcome' | 'auth' | 'cyan' | 'error';
  children: React.ReactNode;
}

export function AuthBackground({
  variant = 'auth',
  children,
}: AuthBackgroundProps) {
  const topProgress = useRef(
    new Animated.Value(0),
  ).current;

  const bottomProgress = useRef(
    new Animated.Value(0),
  ).current;

  const glowProgress = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(topProgress, {
        toValue: 1,
        duration: 900,
        delay: 80,
        useNativeDriver: true,
      }),

      Animated.timing(bottomProgress, {
        toValue: 1,
        duration: 1100,
        delay: 140,
        useNativeDriver: true,
      }),

      Animated.timing(glowProgress, {
        toValue: 1,
        duration: 1200,
        delay: 180,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    bottomProgress,
    glowProgress,
    topProgress,
  ]);

  const topTranslateX =
    topProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [45, 0],
    });

  const topTranslateY =
    topProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [-25, 0],
    });

  const bottomTranslateY =
    bottomProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [55, 0],
    });

  const glowOpacity =
    glowProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  const isCyan =
    variant === 'cyan';

  const isError =
    variant === 'error';

  return (
    <View style={styles.container}>
      <View style={styles.base} />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.topShape,
          {
            backgroundColor: isCyan
              ? colors.connection
              : isError
                ? colors.danger
                : colors.brand,
            opacity: 0.22,
            transform: [
              { translateX: topTranslateX },
              { translateY: topTranslateY },
              { rotate: '-18deg' },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.topGlow,
          {
            backgroundColor: isCyan
              ? colors.connection
              : colors.brand,
            opacity: glowOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.18],
            }),
            transform: [
              { translateX: topTranslateX },
              { translateY: topTranslateY },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.bottomShape,
          {
            backgroundColor: isError
              ? colors.danger
              : colors.connection,
            opacity: 0.2,
            transform: [
              { translateY: bottomTranslateY },
              { rotate: '-14deg' },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.canvas,
  },

  base: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.canvas,
  },

  topShape: {
    position: 'absolute',
    width: 230,
    height: 120,
    right: -45,
    top: 20,
    borderRadius: 90,
  },

  topGlow: {
    position: 'absolute',
    width: 300,
    height: 160,
    right: -90,
    top: -20,
    borderRadius: 100,
  },

  bottomShape: {
    position: 'absolute',
    width: 390,
    height: 145,
    left: -100,
    bottom: -50,
    borderRadius: 100,
  },

  content: {
    flex: 1,
  },
});