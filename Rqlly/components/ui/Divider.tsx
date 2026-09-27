import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from './tokens';

interface RqllyDividerProps {
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export function RqllyDivider({
  spacing = 0,
  style,
}: RqllyDividerProps) {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.border,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
}