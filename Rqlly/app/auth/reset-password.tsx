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

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] =
    useState('');

  return (
    <AuthBackground variant="auth">
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}
      >
        <AuthHeader />

        <View style={styles.container}>
          <View>
            <RqllyText variant="title">
              Create a new password
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
              style={styles.subtitle}
            >
              Choose a strong password to keep
              your account secure.
            </RqllyText>
          </View>

          <View style={styles.form}>
            <RqllyInput
              label="New password"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
            />

            <RqllyInput
              label="Confirm password"
              placeholder="Confirm new password"
              value={confirmation}
              onChangeText={setConfirmation}
              secureTextEntry
              textContentType="newPassword"
            />

            <RqllyButton
              size="large"
              fullWidth
              onPress={() =>
                router.push('/auth/sign-in')
              }
            >
              Reset password
            </RqllyButton>
          </View>

          <View />
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
});