import React, { useState } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyInput,
  RqllyText,
  colors,
  spacing,
} from '../../components/ui';

import {
  AuthBackground,
} from '../../components/auth/AuthBackground';

import {
  AuthHeader,
} from '../../components/auth/AuthHeader';

import {
  RqllyScreen,
} from '../../components/motion/RqllyScreen';

import {
  motion,
} from '../../components/motion/motion';

export default function SignUpScreen() {
  const [identifier, setIdentifier] =
    useState('');

  const [password, setPassword] =
    useState('');

  return (
    <AuthBackground variant="auth">
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}
      >
        <RqllyScreen>
          <AuthHeader />
        </RqllyScreen>

        <View style={styles.container}>
          <RqllyScreen
            delay={motion.delay.first}
          >
            <View>
              <RqllyText variant="title">
                Create your account
              </RqllyText>

              <RqllyText
                variant="body"
                color="secondary"
                style={styles.subtitle}
              >
                Let's get you into Rqlly.
              </RqllyText>
            </View>
          </RqllyScreen>

          <RqllyScreen
            delay={motion.delay.second}
          >
            <View style={styles.form}>
              <RqllyInput
                label="Email or phone number"
                placeholder="you@example.com"
                value={identifier}
                onChangeText={
                  setIdentifier
                }
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
              />

              <RqllyInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={
                  setPassword
                }
                secureTextEntry
                textContentType="newPassword"
              />
            </View>
          </RqllyScreen>

          <RqllyScreen
            delay={motion.delay.fourth}
          >
            <RqllyButton
              size="large"
              fullWidth
              style={styles.button}
              onPress={() =>
                router.push(
                  '/auth/verify',
                )
              }
            >
              Continue
            </RqllyButton>
          </RqllyScreen>

          <RqllyScreen
            delay={motion.delay.fifth}
          >
            <View style={styles.footer}>
              <RqllyText
                variant="small"
                color="secondary"
                align="center"
              >
                Already have an account?{' '}
                <RqllyText
                  variant="small"
                  color="connection"
                  onPress={() =>
                    router.push(
                      '/auth/sign-in',
                    )
                  }
                >
                  Sign in
                </RqllyText>
              </RqllyText>
            </View>
          </RqllyScreen>
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
    paddingHorizontal:
      spacing.xl,
    paddingTop:
      spacing.xxl,
    paddingBottom:
      spacing.lg,
    justifyContent:
      'space-between',
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  form: {
    gap: spacing.lg,
  },

  button: {
    backgroundColor:
      colors.brand,
  },

  footer: {
    paddingTop:
      spacing.lg,
  },
});