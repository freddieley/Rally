import React from 'react';
import { Stack } from 'expo-router';

import { colors } from '../components/ui/tokens';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor:
            colors.canvas,
        },

        animation:
          'simple_push',

        animationDuration: 320,

        gestureEnabled: true,

        gestureDirection:
          'horizontal',

        animationMatchesGesture: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: 'fade',
          animationDuration: 420,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="auth/sign-in"
        options={{
          animation:
            'simple_push',
          animationDuration: 320,
        }}
      />

      <Stack.Screen
        name="auth/sign-up"
        options={{
          animation:
            'simple_push',
          animationDuration: 320,
        }}
      />

      <Stack.Screen
        name="auth/verify"
        options={{
          animation:
            'simple_push',
          animationDuration: 320,
        }}
      />

      <Stack.Screen
        name="auth/forgot-password"
        options={{
          animation:
            'simple_push',
          animationDuration: 320,
        }}
      />

      <Stack.Screen
        name="auth/reset-password"
        options={{
          animation:
            'simple_push',
          animationDuration: 320,
        }}
      />

      <Stack.Screen
        name="loading"
        options={{
          animation: 'fade',
          animationDuration: 300,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="onboarding"
        options={{
          animation: 'fade',
          animationDuration: 360,
        }}
      />

      <Stack.Screen
        name="error"
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}