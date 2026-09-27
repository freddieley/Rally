import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '../ui/tokens';

interface CameraCaptureButtonProps {
  mode: 'photo' | 'video';
  recording?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export function CameraCaptureButton({
  mode,
  recording = false,
  disabled = false,
  onPress,
}: CameraCaptureButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        recording
          ? 'Stop recording'
          : mode === 'photo'
            ? 'Take photo'
            : 'Start recording'
      }
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View
        style={[
          styles.inner,
          mode === 'video' && styles.videoInner,
          recording && styles.recordingInner,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 4,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.white,
  },

  videoInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  recordingInner: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.danger,
  },

  pressed: {
    transform: [{ scale: 0.94 }],
  },

  disabled: {
    opacity: 0.4,
  },
});