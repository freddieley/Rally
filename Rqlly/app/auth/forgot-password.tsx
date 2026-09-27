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

import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthHeader } from '../../components/auth/AuthHeader';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <AuthBackground variant="cyan">
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}
      >
        <AuthHeader />

        <View style={styles.container}>
          <View>
            <RqllyText variant="title">
              Reset your password
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
              style={styles.subtitle}
            >
              Enter your email and we'll send you
              a reset link.
            </RqllyText>
          </View>

          <View style={styles.form}>
            <RqllyInput
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <RqllyButton
              size="large"
              fullWidth
              style={styles.button}
              onPress={() =>
                router.push('/auth/reset-password')
              }
            >
              Send reset link
            </RqllyButton>
          </View>

          <RqllyText
            variant="small"
            color="secondary"
            align="center"
            onPress={() =>
              router.push('/auth/sign-in')
            }
          >
            Back to sign in
          </RqllyText>
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

  subtitle: {
    marginTop: spacing.sm,
    maxWidth: 330,
  },

  form: {
    gap: spacing.lg,
  },

  button: {
    backgroundColor: colors.connection,
  },
});