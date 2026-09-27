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

interface RqllyBottomSheetProps {
  visible: boolean;
  onClose: () => void;

  children: React.ReactNode;

  title?: string;

  style?: StyleProp<ViewStyle>;
}

export function RqllyBottomSheet({
  visible,
  onClose,
  children,
  title,
  style,
}: RqllyBottomSheetProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.68)',
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
              backgroundColor: colors.surfaceElevated,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingTop: spacing.sm,
              paddingHorizontal: spacing.xl,
              paddingBottom: spacing.xxxl,
              borderTopWidth: 1,
              borderColor: colors.border,
            },
            style,
          ]}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              backgroundColor: colors.borderStrong,
              alignSelf: 'center',
              marginBottom: spacing.xl,
            }}
          />

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