import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RqllyButton, RqllyInput, RqllyText, colors, spacing } from '../../components/ui';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthError } from '../../components/auth/AuthError';
import { RqllyScreen } from '../../components/motion/RqllyScreen';
import { motion } from '../../components/motion/motion';
import { useAuth } from '../../lib/auth';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [username,setUsername]=useState('');
  const [displayName,setDisplayName]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);

  async function submit() {
    const clean=username.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(clean)) return setError('Username must be 3–24 characters using lowercase letters, numbers or underscores.');
    if (!displayName.trim()) return setError('Enter a display name.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    setError(null); setBusy(true);
    try { await signUp(clean,displayName.trim(),password); router.replace('/loading'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not create your account.'); }
    finally { setBusy(false); }
  }

  return (
    <AuthBackground variant="auth">
      <SafeAreaView style={styles.safeArea} edges={['top','bottom']}>
        <RqllyScreen><AuthHeader /></RqllyScreen>
        <View style={styles.container}>
          <RqllyScreen delay={motion.delay.first}><View><RqllyText variant="title">Create your account</RqllyText><RqllyText variant="body" color="secondary" style={styles.subtitle}>Pick a name and get into Rqlly.</RqllyText></View></RqllyScreen>
          <RqllyScreen delay={motion.delay.second}>
            <View style={styles.form}>
              <RqllyInput label="Username" placeholder="yourname" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} textContentType="username" />
              <RqllyInput label="Display name" placeholder="How people see you" value={displayName} onChangeText={setDisplayName} autoCorrect={false} textContentType="name" />
              <RqllyInput label="Password" placeholder="Create a password" value={password} onChangeText={setPassword} secureTextEntry textContentType="newPassword" />
              <AuthError message={error} />
            </View>
          </RqllyScreen>
          <RqllyScreen delay={motion.delay.fourth}><RqllyButton size="large" fullWidth style={styles.button} onPress={submit} disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</RqllyButton></RqllyScreen>
          <RqllyScreen delay={motion.delay.fifth}><View style={styles.footer}><RqllyText variant="small" color="secondary" align="center">Already have an account? <RqllyText variant="small" color="connection" onPress={() => router.push('/auth/sign-in')}>Sign in</RqllyText></RqllyText></View></RqllyScreen>
        </View>
      </SafeAreaView>
    </AuthBackground>
  );
}
const styles=StyleSheet.create({safeArea:{flex:1},container:{flex:1,paddingHorizontal:spacing.xl,paddingTop:spacing.xxl,paddingBottom:spacing.lg,justifyContent:'space-between'},subtitle:{marginTop:spacing.sm},form:{gap:spacing.lg},button:{backgroundColor:colors.brand},footer:{paddingTop:spacing.lg}});
