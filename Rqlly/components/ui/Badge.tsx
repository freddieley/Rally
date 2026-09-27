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

import { RqllyText } from './Text';

export type BadgeVariant =
  | 'brand'
  | 'connection'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

interface RqllyBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

const colorMap: Record<
  BadgeVariant,
  { background: string; text: string }
> = {
  brand: {
    background: colors.brand,
    text: colors.white,
  },
  connection: {
    background: colors.connection,
    text: colors.black,
  },
  success: {
    background: colors.success,
    text: colors.black,
  },
  warning: {
    background: colors.warning,
    text: colors.black,
  },
  danger: {
    background: colors.danger,
    text: colors.white,
  },
  neutral: {
    background: colors.surfaceInteractive,
    text: colors.textSecondary,
  },
};

export function RqllyBadge({
  children,
  variant = 'neutral',
  style,
}: RqllyBadgeProps) {
  const scheme = colorMap[variant];

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          paddingHorizontal: spacing.sm,
          paddingVertical: 5,
          borderRadius: radius.pill,
          backgroundColor: scheme.background,
        },
        style,
      ]}
    >
      <RqllyText
        variant="caption"
        style={{
          color: scheme.text,
        }}
      >
        {children}
      </RqllyText>
    </View>
  );
}