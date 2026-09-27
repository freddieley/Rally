import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../ui/tokens';

interface CameraTopBarProps {
  flash: 'off' | 'on' | 'auto' | 'screen';
  onClose: () => void;
  onFlashPress: () => void;
}

export function CameraTopBar({
  flash,
  onClose,
  onFlashPress,
}: CameraTopBarProps) {
  const flashLabel =
    flash === 'auto'
      ? 'A'
      : flash === 'on'
        ? '⚡'
        : '⚡';

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close camera"
        onPress={onClose}
        style={styles.button}
      >
        <Text style={styles.close}>×</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change flash mode"
        onPress={onFlashPress}
        style={[
          styles.button,
          flash !== 'off' && styles.activeButton,
        ]}
      >
        <Text style={styles.icon}>
          {flashLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },

  activeButton: {
    backgroundColor: 'rgba(228, 27, 205, 0.82)',
  },

  close: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 32,
  },

  icon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});