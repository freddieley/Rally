import React from 'react';
import { Stack } from 'expo-router';

import { colors } from '../components/ui/tokens';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: colors.canvas,
        },

        animation: 'slide_from_right',

        gestureEnabled: true,
        gestureDirection: 'horizontal',

        animationDuration: 320,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: 'fade',
          animationDuration: 450,
        }}
      />

      <Stack.Screen
        name="auth/sign-in"
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="auth/sign-up"
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="auth/verify"
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="auth/forgot-password"
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="auth/reset-password"
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="loading"
        options={{
          animation: 'fade',
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="onboarding"
        options={{
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="error"
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  );
}