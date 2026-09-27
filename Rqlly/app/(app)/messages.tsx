import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyEmptyState,
  RqllyText,
  colors,
  spacing,
} from '../../components/ui';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <RqllyText variant="display">
          Messages
        </RqllyText>

        <RqllyEmptyState
          title="No conversations yet"
          description="When you're making plans with people, your conversations will appear here."
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
});