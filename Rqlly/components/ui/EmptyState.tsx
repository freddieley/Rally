import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  spacing,
} from './tokens';

import { RqllyText } from './Text';

interface RqllyEmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function RqllyEmptyState({
  title,
  description,
  icon,
  action,
  style,
}: RqllyEmptyStateProps) {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.xxxl,
        },
        style,
      ]}
    >
      {icon && (
        <View
          style={{
            marginBottom: spacing.lg,
          }}
        >
          {icon}
        </View>
      )}

      <RqllyText
        variant="heading"
        align="center"
      >
        {title}
      </RqllyText>

      {description && (
        <RqllyText
          variant="body"
          color="secondary"
          align="center"
          style={{
            marginTop: spacing.sm,
            maxWidth: 320,
          }}
        >
          {description}
        </RqllyText>
      )}

      {action && (
        <View
          style={{
            marginTop: spacing.xl,
          }}
        >
          {action}
        </View>
      )}
    </View>
  );
}