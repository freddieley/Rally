import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { colors, spacing } from './tokens';
import { RqllyText } from './Text';

interface RqllyLoadingProps {
  size?: 'small' | 'large';
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export function RqllyLoading({
  size = 'small',
  label,
  style,
}: RqllyLoadingProps) {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.lg,
        },
        style,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={colors.brand}
      />

      {label && (
        <RqllyText
          variant="small"
          color="secondary"
          style={{
            marginTop: spacing.sm,
          }}
        >
          {label}
        </RqllyText>
      )}
    </View>
  );
}