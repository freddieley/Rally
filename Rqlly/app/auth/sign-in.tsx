import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RqllyButton, RqllyInput, RqllyText, colors, spacing } from '../../components/ui';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthError } from '../../components/auth/AuthError';
import { RqllyScreen } from '../../components/motion/RqllyScreen';
import { motion } from '../../components/motion/motion';
import { useAuth } from '../../lib/auth';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!identifier.trim() || !password) return setError('Enter your username or email and password.');
    setError(null); setBusy(true);
    try { await signIn(identifier, password); router.replace('/loading'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not sign in.'); }
    finally { setBusy(false); }
  }

  return (
    <AuthBackground variant="cyan">
      <SafeAreaView style={styles.safeArea} edges={['top','bottom']}>
        <RqllyScreen><AuthHeader /></RqllyScreen>
        <View style={styles.container}>
          <RqllyScreen delay={motion.delay.first}>
            <View><RqllyText variant="title">Welcome back</RqllyText><RqllyText variant="body" color="secondary" style={styles.subtitle}>Good to see you again.</RqllyText></View>
          </RqllyScreen>
          <RqllyScreen delay={motion.delay.second}>
            <View style={styles.form}>
              <RqllyInput label="Username or email" placeholder="yourusername" value={identifier} onChangeText={setIdentifier} autoCapitalize="none" autoCorrect={false} textContentType="username" />
              <RqllyInput label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry textContentType="password" />
              <AuthError message={error} />
            </View>
          </RqllyScreen>
          <RqllyScreen delay={motion.delay.third}>
            <Pressable onPress={() => router.push('/auth/forgot-password')} hitSlop={8} style={styles.forgot}><RqllyText variant="small" color="connection" align="center">Forgot password?</RqllyText></Pressable>
          </RqllyScreen>
          <RqllyScreen delay={motion.delay.fourth}>
            <RqllyButton size="large" fullWidth style={styles.button} onPress={submit} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</RqllyButton>
          </RqllyScreen>
          <RqllyScreen delay={motion.delay.fifth}>
            <View style={styles.footer}><RqllyText variant="small" color="secondary" align="center">Don't have an account? <RqllyText variant="small" color="brand" onPress={() => router.push('/auth/sign-up')}>Sign up</RqllyText></RqllyText></View>
          </RqllyScreen>
        </View>
      </SafeAreaView>
    </AuthBackground>
  );
}
const styles = StyleSheet.create({
  safeArea:{flex:1}, container:{flex:1,paddingHorizontal:spacing.xl,paddingTop:spacing.xxl,paddingBottom:spacing.lg,justifyContent:'space-between'},
  subtitle:{marginTop:spacing.sm}, form:{gap:spacing.lg}, forgot:{alignSelf:'center',paddingVertical:spacing.xs},
  button:{backgroundColor:colors.connection}, footer:{paddingTop:spacing.lg}
});
