import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyText,
  colors,
  spacing,
} from '../../components/ui';

import { Avatar } from '../../components/people';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar
            name="Freddie"
            size="large"
            presence="online"
          />

          <RqllyText
            variant="title"
            style={styles.name}
          >
            Freddie
          </RqllyText>

          <RqllyText
            variant="small"
            color="secondary"
          >
            @freddie
          </RqllyText>
        </View>

        <View style={styles.stats}>
          <Stat
            value="0"
            label="Parties"
          />

          <Stat
            value="0"
            label="Friends"
          />

          <Stat
            value="0"
            label="Going"
          />
        </View>

        <RqllyButton
          variant="secondary"
          fullWidth
        >
          Edit profile
        </RqllyButton>
      </View>
    </SafeAreaView>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <RqllyText variant="heading" align="center">
        {value}
      </RqllyText>

      <RqllyText
        variant="caption"
        color="tertiary"
        align="center"
      >
        {label}
      </RqllyText>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  container: {
    flex: 1,

    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },

  profile: {
    alignItems: 'center',
  },

  name: {
    marginTop: spacing.md,
  },

  stats: {
    flexDirection: 'row',

    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,

    paddingVertical: spacing.lg,

    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  stat: {
    flex: 1,
  },
});