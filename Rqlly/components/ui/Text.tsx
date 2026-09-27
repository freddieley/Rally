import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

import { colors, typography } from './tokens';

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodyMedium'
  | 'small'
  | 'caption'
  | 'button';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'brand'
  | 'connection'
  | 'success'
  | 'warning'
  | 'danger';

export interface RqllyTextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const colorMap: Record<TextColor, string> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  tertiary: colors.textTertiary,
  disabled: colors.textDisabled,
  brand: colors.brand,
  connection: colors.connection,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

export function RqllyText({
  variant = 'body',
  color = 'primary',
  align = 'left',
  style,
  children,
  ...props
}: RqllyTextProps) {
  return (
    <RNText
      {...props}
      style={[
        typography[variant],
        {
          color: colorMap[color],
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}