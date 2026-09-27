import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyText,
  spacing,
} from '../components/ui';

import { AuthBackground } from '../components/auth/AuthBackground';

export default function OnboardingScreen() {
  return (
    <AuthBackground variant="welcome">
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}
      >
        <View style={styles.container}>
          <View />

          <View style={styles.content}>
            <RqllyText
              variant="display"
              align="center"
            >
              Welcome to Rqlly
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
              align="center"
              style={styles.description}
            >
              Before you get started, we'll help
              you build your profile and find your
              people.
            </RqllyText>

            <RqllyButton
              size="large"
              fullWidth
              style={styles.button}
              onPress={() =>
                router.replace('/')
              }
            >
              Continue
            </RqllyButton>

            <RqllyText
              variant="small"
              color="tertiary"
              align="center"
              onPress={() =>
                router.replace('/')
              }
            >
              Skip for now
            </RqllyText>
          </View>

          <View style={styles.dots}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
  },

  content: {
    alignItems: 'center',
  },

  description: {
    maxWidth: 320,
    marginTop: spacing.lg,
  },

  button: {
    width: '100%',
    marginTop: spacing.xxl,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
});