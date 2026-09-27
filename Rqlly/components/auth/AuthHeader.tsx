import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';

import {
  RqllyText,
  colors,
  spacing,
} from '../ui';

interface AuthHeaderProps {
  showBack?: boolean;
  right?: React.ReactNode;
}

export function AuthHeader({
  showBack = true,
  right,
}: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBack && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.back}
          >
            <RqllyText
              variant="title"
              color="primary"
            >
              ‹
            </RqllyText>
          </Pressable>
        )}
      </View>

      <RqllyText
        variant="heading"
        align="center"
      >
        Rqlly
      </RqllyText>

      <View style={styles.side}>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },

  side: {
    width: 44,
    alignItems: 'flex-start',
  },

  back: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});