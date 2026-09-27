import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  sizes,
} from './tokens';

export type IconButtonVariant =
  | 'default'
  | 'surface'
  | 'brand'
  | 'ghost';

export type IconButtonSize =
  | 'small'
  | 'medium'
  | 'large';

interface RqllyIconButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;

  variant?: IconButtonVariant;
  size?: IconButtonSize;

  disabled?: boolean;
  accessibilityLabel?: string;

  style?: StyleProp<ViewStyle>;
}

const sizeMap: Record<IconButtonSize, number> = {
  small: sizes.iconButtonSmall,
  medium: sizes.iconButtonMedium,
  large: sizes.iconButtonLarge,
};

export function RqllyIconButton({
  icon,
  onPress,
  variant = 'default',
  size = 'medium',
  disabled = false,
  accessibilityLabel,
  style,
}: RqllyIconButtonProps) {
  const backgroundColor =
    variant === 'surface'
      ? colors.surfaceInteractive
      : variant === 'brand'
        ? colors.brand
        : 'transparent';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          width: sizeMap[size],
          height: sizeMap[size],
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor,
          opacity:
            disabled
              ? 0.4
              : pressed
                ? 0.72
                : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}