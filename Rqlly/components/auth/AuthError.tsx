import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RqllyText, colors, spacing } from '../ui';

export function AuthError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.box}>
      <RqllyText variant="small" color="danger">{message}</RqllyText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'rgba(255,80,100,0.35)',
    backgroundColor: 'rgba(255,80,100,0.08)',
    borderRadius: 12,
    padding: spacing.md,
  },
});
