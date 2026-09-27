import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyText,
  colors,
  radius,
  spacing,
} from '../components/ui';

import { AuthBackground } from '../components/auth/AuthBackground';

export default function WelcomeScreen() {
  return (
    <AuthBackground variant="welcome">
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}
      >
        <View style={styles.container}>
          <View style={styles.logoArea}>
            <RqllyText
              variant="display"
              align="center"
              style={styles.logo}
            >
              Rqlly
            </RqllyText>

            <View style={styles.logoUnderline} />
          </View>

          <View style={styles.hero}>
            <RqllyText
              variant="title"
              align="center"
            >
              Meet up.
            </RqllyText>

            <RqllyText
              variant="title"
              align="center"
            >
              Make plans.
            </RqllyText>

            <RqllyText
              variant="title"
              align="center"
            >
              See what's happening.
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
              align="center"
              style={styles.description}
            >
              Discover people, parties and plans
              happening around you.
            </RqllyText>
          </View>

          <View style={styles.actions}>
            <RqllyButton
              size="large"
              fullWidth
              rightIcon={
                <RqllyText
                  variant="bodyMedium"
                  color="primary"
                >
                  →
                </RqllyText>
              }
              onPress={() =>
                router.push('/auth/sign-up')
              }
            >
              Get started
            </RqllyButton>

            <Pressable
              onPress={() =>
                router.push('/auth/sign-in')
              }
              style={styles.signInLink}
              hitSlop={10}
            >
              <RqllyText
                variant="small"
                color="secondary"
                align="center"
              >
                Already have an account?{' '}
                <RqllyText
                  variant="small"
                  color="connection"
                >
                  Sign in
                </RqllyText>
              </RqllyText>
            </Pressable>
          </View>

          <View style={styles.bottomStatement}>
            <View style={styles.statementLine} />

            <RqllyText
              variant="caption"
              color="secondary"
              align="center"
            >
              REAL PEOPLE.
            </RqllyText>

            <RqllyText
              variant="caption"
              color="brand"
              align="center"
            >
              REAL MOMENTS.
            </RqllyText>

            <RqllyText
              variant="caption"
              color="connection"
              align="center"
            >
              RQLLY.
            </RqllyText>
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
    justifyContent: 'space-between',
  },

  logoArea: {
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },

  logo: {
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: -2,
  },

  logoUnderline: {
    width: 42,
    height: 3,
    marginTop: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.connection,
  },

  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },

  description: {
    maxWidth: 290,
    marginTop: spacing.lg,
  },

  actions: {
    gap: spacing.md,
  },

  signInLink: {
    minHeight: 40,
    justifyContent: 'center',
  },

  bottomStatement: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
    gap: 3,
  },

  statementLine: {
    width: 48,
    height: 1,
    backgroundColor: colors.borderStrong,
    marginBottom: spacing.sm,
  },
});