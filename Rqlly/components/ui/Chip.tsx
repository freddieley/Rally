import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from './tokens';

import { RqllyText } from './Text';

interface RqllyChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;

  leading?: React.ReactNode;
  trailing?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function RqllyChip({
  children,
  selected = false,
  onPress,
  disabled = false,
  leading,
  trailing,
  style,
}: RqllyChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          minHeight: 36,
          paddingHorizontal: spacing.md,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: selected
            ? colors.brand
            : colors.border,
          backgroundColor: selected
            ? colors.brand
            : colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity:
            disabled
              ? 0.4
              : pressed
                ? 0.75
                : 1,
        },
        style,
      ]}
    >
      {leading && (
        <Pressable
          pointerEvents="none"
          style={{ marginRight: spacing.xs }}
        >
          {leading}
        </Pressable>
      )}

      <RqllyText
        variant="small"
        style={{
          color: selected
            ? colors.white
            : colors.textSecondary,
          fontWeight: '600',
        }}
      >
        {children}
      </RqllyText>

      {trailing && (
        <Pressable
          pointerEvents="none"
          style={{ marginLeft: spacing.xs }}
        >
          {trailing}
        </Pressable>
      )}
    </Pressable>
  );
}