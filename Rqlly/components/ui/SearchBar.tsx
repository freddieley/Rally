import React from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from './tokens';

import { RqllyText } from './Text';
import { autofillDataSet, ensureWebAutofillReset } from './webAutofillReset';

ensureWebAutofillReset(colors.textPrimary, colors.surface);

interface RqllySearchBarProps
  extends Omit<TextInputProps, 'style'> {
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function RqllySearchBar({
  onClear,
  value,
  style,
  ...props
}: RqllySearchBarProps) {
  return (
    <View
      style={[
        {
          height: 48,
          borderRadius: radius.pill,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.lg,
        },
        style,
      ]}
    >
      <RqllyText
        variant="body"
        color="tertiary"
        style={{
          fontSize: 22,
          marginRight: spacing.sm,
          lineHeight: 22,
        }}
      >
        ⌕
      </RqllyText>

      <TextInput
        {...props}
        value={value}
        {...autofillDataSet}
        placeholderTextColor={colors.textTertiary}
        selectionColor={colors.brand}
        style={{
          flex: 1,
          height: '100%',
          color: colors.textPrimary,
          fontSize: 16,
          outlineStyle: 'none' as never,
        }}
      />

      {value ? (
        <Pressable
          onPress={onClear}
          hitSlop={8}
        >
          <RqllyText
            variant="bodyMedium"
            color="tertiary"
          >
            ×
          </RqllyText>
        </Pressable>
      ) : null}
    </View>
  );
}