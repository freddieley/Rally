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

interface RqllyHeaderProps {
  title?: string;
  subtitle?: string;

  left?: React.ReactNode;
  right?: React.ReactNode;

  centerTitle?: boolean;

  style?: StyleProp<ViewStyle>;
}

export function RqllyHeader({
  title,
  subtitle,
  left,
  right,
  centerTitle = false,
  style,
}: RqllyHeaderProps) {
  return (
    <View
      style={[
        {
          minHeight: 56,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.lg,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {left}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: centerTitle
            ? 'center'
            : 'flex-start',
        }}
      >
        {title && (
          <RqllyText variant="heading">
            {title}
          </RqllyText>
        )}

        {subtitle && (
          <RqllyText
            variant="small"
            color="secondary"
          >
            {subtitle}
          </RqllyText>
        )}
      </View>

      <View
        style={{
          width: 44,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {right}
      </View>
    </View>
  );
}