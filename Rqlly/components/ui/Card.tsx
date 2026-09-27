import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from './tokens';

interface RqllyCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  padding?: keyof typeof spacing;
  style?: StyleProp<ViewStyle>;
}

export function RqllyCard({
  children,
  elevated = false,
  padding = 'lg',
  style,
}: RqllyCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: elevated
            ? colors.surfaceElevated
            : colors.surface,
          borderRadius: radius.lg,
          padding: spacing[padding],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}