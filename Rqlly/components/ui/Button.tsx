import React, {
  useRef,
} from 'react';

import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  sizes,
  typography,
} from './tokens';

import { RqllyText } from './Text';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive';

export type ButtonSize =
  | 'small'
  | 'medium'
  | 'large';

export interface RqllyButtonProps {
  children: React.ReactNode;
  onPress?: () => void;

  variant?: ButtonVariant;
  size?: ButtonSize;

  disabled?: boolean;
  loading?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  fullWidth?: boolean;

  style?: StyleProp<ViewStyle>;
}

const heightMap: Record<
  ButtonSize,
  number
> = {
  small: sizes.buttonSmall,
  medium: sizes.buttonMedium,
  large: sizes.buttonLarge,
};

const horizontalPaddingMap: Record<
  ButtonSize,
  number
> = {
  small: 14,
  medium: 18,
  large: 22,
};

export function RqllyButton({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
}: RqllyButtonProps) {
  const scale = useRef(
    new Animated.Value(1),
  ).current;

  const height =
    heightMap[size];

  const backgroundColor =
    variant === 'primary'
      ? colors.brand
      : variant === 'secondary'
        ? colors.surfaceInteractive
        : variant === 'destructive'
          ? colors.danger
          : 'transparent';

  const textColor =
    variant === 'primary' ||
    variant === 'destructive'
      ? colors.white
      : variant === 'secondary'
        ? colors.textPrimary
        : colors.textSecondary;

  const borderWidth =
    variant === 'secondary'
      ? 1
      : variant === 'ghost'
        ? 1
        : 0;

  const borderColor =
    variant === 'secondary'
      ? colors.borderStrong
      : variant === 'ghost'
        ? colors.border
        : 'transparent';

  const animatePress = (
    value: number,
  ) => {
    if (disabled || loading) {
      return;
    }

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
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() =>
        animatePress(0.975)
      }
      onPressOut={() =>
        animatePress(1)
      }
      accessibilityRole="button"
      accessibilityState={{
        disabled:
          disabled || loading,
        busy: loading,
      }}
      style={{
        alignSelf: fullWidth
          ? 'stretch'
          : 'flex-start',
      }}
    >
      <Animated.View
        style={[
          {
            minHeight: height,
            paddingHorizontal:
              horizontalPaddingMap[
                size
              ],
            borderRadius: radius.pill,
            backgroundColor,
            borderWidth,
            borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled
              ? 0.45
              : 1,
            transform: [
              { scale },
            ],
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
          />
        ) : (
          <>
            {leftIcon && (
              <View
                style={{
                  marginRight: 8,
                }}
              >
                {leftIcon}
              </View>
            )}

            <RqllyText
              variant="button"
              style={{
                color: textColor,
                ...typography.button,
              }}
            >
              {children}
            </RqllyText>

            {rightIcon && (
              <View
                style={{
                  marginLeft: 8,
                }}
              >
                {rightIcon}
              </View>
            )}
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}