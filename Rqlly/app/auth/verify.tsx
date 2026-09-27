import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
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

export default function VerifyScreen() {
  const [code, setCode] =
    useState('');

  const inputRef =
    useRef<TextInput>(null);

  const completeScale =
    useRef(
      new Animated.Value(1),
    ).current;

  const digits = Array.from(
    { length: 6 },
    (_, index) => code[index] ?? '',
  );

  useEffect(() => {
    if (code.length === 6) {
      Animated.sequence([
        Animated.spring(completeScale, {
          toValue: 1.04,
          damping: 12,
          stiffness: 300,
          useNativeDriver: true,
        }),

        Animated.spring(completeScale, {
          toValue: 1,
          damping: 14,
          stiffness: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [code, completeScale]);

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
          <RqllyScreen delay={60}>
            <View>
              <RqllyText variant="title">
                Verify your email
              </RqllyText>

              <RqllyText
                variant="body"
                color="secondary"
                style={styles.subtitle}
              >
                We've sent a 6 digit code to
                {'\n'}
                you@example.com
              </RqllyText>
            </View>
          </RqllyScreen>

          <RqllyScreen delay={120}>
            <Pressable
              onPress={() =>
                inputRef.current?.focus()
              }
              style={styles.codeArea}
            >
              <Animated.View
                style={[
                  styles.codeRow,
                  {
                    transform: [
                      {
                        scale: completeScale,
                      },
                    ],
                  },
                ]}
              >
                {digits.map(
                  (digit, index) => {
                    const active =
                      index === code.length;

                    const filled =
                      Boolean(digit);

                    return (
                      <View
                        key={index}
                        style={[
                          styles.codeBox,
                          active &&
                            styles.codeBoxActive,
                          filled &&
                            styles.codeBoxFilled,
                        ]}
                      >
                        <RqllyText
                          variant="heading"
                          align="center"
                        >
                          {digit}
                        </RqllyText>
                      </View>
                    );
                  },
                )}
              </Animated.View>

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={(value) =>
                  setCode(
                    value
                      .replace(/\D/g, '')
                      .slice(0, 6),
                  )
                }
                keyboardType="number-pad"
                maxLength={6}
                style={styles.hiddenInput}
                autoFocus
              />
            </Pressable>
          </RqllyScreen>

          <RqllyScreen delay={180}>
            <View style={styles.actions}>
              <Pressable hitSlop={8}>
                <RqllyText
                  variant="small"
                  color="secondary"
                  align="center"
                >
                  Didn't receive the code?{' '}
                  <RqllyText
                    variant="small"
                    color="connection"
                  >
                    Resend
                  </RqllyText>
                </RqllyText>
              </Pressable>

              <RqllyButton
                size="large"
                fullWidth
                onPress={() =>
                  router.push(
                    '/onboarding',
                  )
                }
              >
                Continue
              </RqllyButton>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  codeArea: {
    alignItems: 'center',
  },

  codeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  codeBox: {
    width: 44,
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  codeBoxActive: {
    borderColor: colors.brand,
  },

  codeBoxFilled: {
    borderColor: colors.connection,
  },

  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },

  actions: {
    gap: spacing.xl,
  },
});