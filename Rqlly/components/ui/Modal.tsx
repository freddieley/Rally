import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from './tokens';
import { RqllyText } from './Text';

interface RqllyModalProps {
  visible: boolean;
  onClose: () => void;

  children: React.ReactNode;

  title?: string;
  style?: StyleProp<ViewStyle>;
}

export function RqllyModal({
  visible,
  onClose,
  children,
  title,
  style,
}: RqllyModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xl,
        }}
      >
        <Pressable
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View
          style={[
            {
              width: '100%',
              maxWidth: 480,
              backgroundColor: colors.surfaceElevated,
              borderRadius: radius.xl,
              padding: spacing.xl,
              borderWidth: 1,
              borderColor: colors.border,
            },
            style,
          ]}
        >
          {title && (
            <RqllyText
              variant="heading"
              style={{
                marginBottom: spacing.lg,
              }}
            >
              {title}
            </RqllyText>
          )}

          {children}
        </View>
      </View>
    </RNModal>
  );
}