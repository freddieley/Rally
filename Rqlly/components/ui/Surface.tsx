import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius } from './tokens';

export type SurfaceVariant =
  | 'default'
  | 'elevated'
  | 'interactive';

interface BaseProps {
  variant?: SurfaceVariant;
  radiusSize?: keyof typeof radius;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

interface SurfaceProps extends BaseProps {
  onPress?: undefined;
}

interface InteractiveSurfaceProps
  extends Omit<PressableProps, 'style' | 'children'>,
    BaseProps {
  onPress: PressableProps['onPress'];
}

export function RqllySurface(
  props: SurfaceProps | InteractiveSurfaceProps,
) {
  const {
    variant = 'default',
    radiusSize = 'lg',
    style,
    children,
  } = props;

  const backgroundColor =
    variant === 'elevated'
      ? colors.surfaceElevated
      : variant === 'interactive'
        ? colors.surfaceInteractive
        : colors.surface;

  const baseStyle: ViewStyle = {
    backgroundColor,
    borderRadius: radius[radiusSize],
  };

  if ('onPress' in props && props.onPress) {
    const {
      onPress,
      ...pressableProps
    } = props as InteractiveSurfaceProps;

    return (
      <Pressable
        {...pressableProps}
        onPress={onPress}
        style={({ pressed }) => [
          baseStyle,
          {
            opacity: pressed ? 0.82 : 1,
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[baseStyle, style]}>
      {children}
    </View>
  );
}