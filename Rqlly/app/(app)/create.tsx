import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyText,
  colors,
  spacing,
} from '../../components/ui';

export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <RqllyText variant="display">
          Create
        </RqllyText>

        <RqllyText
          variant="body"
          color="secondary"
          style={styles.description}
        >
          Start a party and bring people together.
        </RqllyText>

        <RqllyButton size="large" fullWidth>
          Start a party
        </RqllyButton>
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

    justifyContent: 'flex-start',
  },

  description: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
});