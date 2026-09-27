import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing } from '../ui/tokens';

export type CameraMode = 'photo' | 'video';

interface CameraModeSelectorProps {
  mode: CameraMode;
  onChange: (mode: CameraMode) => void;
}

export function CameraModeSelector({
  mode,
  onChange,
}: CameraModeSelectorProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange('photo')}
        style={[
          styles.option,
          mode === 'photo' && styles.activeOption,
        ]}
      >
        <Text
          style={[
            styles.label,
            mode === 'photo' && styles.activeLabel,
          ]}
        >
          PHOTO
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('video')}
        style={[
          styles.option,
          mode === 'video' && styles.activeOption,
        ]}
      >
        <Text
          style={[
            styles.label,
            mode === 'video' && styles.activeLabel,
          ]}
        >
          VIDEO
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },

  option: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  activeOption: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brand,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  activeLabel: {
    color: colors.white,
  },
});