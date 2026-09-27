import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../ui/tokens';
import { CameraCaptureButton } from './CameraCaptureButton';
import {
  CameraMode,
  CameraModeSelector,
} from './CameraModeSelector';

interface CameraControlsProps {
  mode: CameraMode;
  recording: boolean;
  ready: boolean;
  onModeChange: (mode: CameraMode) => void;
  onCapture: () => void;
  onFlip: () => void;
  onGallery: () => void;
}

export function CameraControls({
  mode,
  recording,
  ready,
  onModeChange,
  onCapture,
  onFlip,
  onGallery,
}: CameraControlsProps) {
  return (
    <View style={styles.container}>
      <CameraModeSelector
        mode={mode}
        onChange={onModeChange}
      />

      <View style={styles.captureRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open gallery"
          onPress={onGallery}
          style={styles.sideButton}
        >
          <Text style={styles.sideIcon}>▣</Text>
        </Pressable>

        <CameraCaptureButton
          mode={mode}
          recording={recording}
          disabled={!ready}
          onPress={onCapture}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Switch camera"
          onPress={onFlip}
          style={styles.sideButton}
        >
          <Text style={styles.sideIcon}>↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sideButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },

  sideIcon: {
    color: colors.white,
    fontSize: 23,
  },
});