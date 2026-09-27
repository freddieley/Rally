import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
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

import {
  AuthBackground,
} from '../components/auth/AuthBackground';

import {
  RqllyScreen,
} from '../components/motion/RqllyScreen';

import {
  motion,
} from '../components/motion/motion';

export default function AuthErrorScreen() {
  const iconScale =
    useRef(
      new Animated.Value(
        motion.scale.entrance,
      ),
    ).current;

  useEffect(() => {
    Animated.spring(iconScale, {
      toValue: 1,
      ...motion.spring.confirmation,
      useNativeDriver: true,
    }).start();
  }, [iconScale]);

  return (
    <AuthBackground variant="error">
      <SafeAreaView
        style={styles.safeArea}
      >
        <View style={styles.container}>
          <RqllyScreen>
            <Animated.View
              style={[
                styles.icon,
                {
                  transform: [
                    {
                      scale: iconScale,
                    },
                  ],
                },
              ]}
            >
              <RqllyText
                variant="title"
                color="brand"
                align="center"
              >
                !
              </RqllyText>
            </Animated.View>
          </RqllyScreen>

          <RqllyScreen
            delay={motion.delay.second}
          >
            <View>
              <RqllyText
                variant="heading"
                align="center"
              >
                Something went wrong
              </RqllyText>

              <RqllyText
                variant="body"
                color="secondary"
                align="center"
                style={
                  styles.description
                }
              >
                We couldn't sign you in.
                Please check your details
                and try again.
              </RqllyText>
            </View>
          </RqllyScreen>

          <RqllyScreen
            delay={motion.delay.fourth}
          >
            <View style={styles.actions}>
              <RqllyButton
                size="large"
                fullWidth
                onPress={() =>
                  router.push(
                    '/auth/sign-in',
                  )
                }
              >
                Try again
              </RqllyButton>

              <RqllyText
                variant="small"
                color="secondary"
                align="center"
                onPress={() =>
                  router.replace('/')
                }
              >
                Back to welcome
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
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingTop: 180,
    paddingBottom:
      spacing.xxl,
  },

  icon: {
    width: 68,
    height: 68,
    borderRadius:
      radius.pill,
    borderWidth: 2,
    borderColor:
      colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    marginTop:
      spacing.md,
    maxWidth: 310,
  },

  actions: {
    width: '100%',
    gap: spacing.lg,
  },
});