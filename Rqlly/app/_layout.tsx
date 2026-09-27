import React, { useEffect } from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../lib/auth';
import { colors } from '../components/ui/tokens';

function AuthGate() {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const isPublic = pathname === '/' || pathname.startsWith('/auth') || pathname === '/loading' || pathname === '/error';
    if (!session && !isPublic) router.replace('/');
    if (session && (pathname === '/' || pathname.startsWith('/auth'))) router.replace('/(app)/discover');
  }, [loading, session, pathname, router]);

  return null;
}

function Navigation() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.canvas },
      animation: 'simple_push',
      animationDuration: 320,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      animationMatchesGesture: true,
    }}>
      <Stack.Screen name="index" options={{ animation: 'fade', animationDuration: 420, gestureEnabled: false }} />
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="auth/sign-up" />
      <Stack.Screen name="auth/verify" />
      <Stack.Screen name="auth/forgot-password" />
      <Stack.Screen name="auth/reset-password" />
      <Stack.Screen name="loading" options={{ animation: 'fade', animationDuration: 300, gestureEnabled: false }} />
      <Stack.Screen name="onboarding" options={{ animation: 'fade', animationDuration: 360 }} />
      <Stack.Screen name="error" options={{ animation: 'fade', animationDuration: 300 }} />
      <Stack.Screen name="(app)" options={{ headerShown: false, animation: 'fade', gestureEnabled: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigation />
      <AuthGate />
    </AuthProvider>
  );
}
