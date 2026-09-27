import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from './tokens';
import { RqllyText } from './Text';
import {
  ensureWebAutofillReset,
  ensureWebAutofillRoundedCorners,
  roundedAutofillDataSet,
} from './webAutofillReset';

ensureWebAutofillReset(colors.textPrimary, colors.surface);
ensureWebAutofillRoundedCorners(radius.md);

interface RqllyInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}


export function RqllyInput({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  containerStyle,
  style,
  ...props
}: RqllyInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.brand
      : colors.border;

  return (
    <View style={containerStyle}>
      {label && (
        <RqllyText
          variant="small"
          color="secondary"
          style={styles.label}
        >
          {label}
        </RqllyText>
      )}

      <View
        style={[
          styles.inputContainer,
          { borderColor },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          {...props}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightElement ? styles.inputWithRightElement : undefined,
            style,
          ]}
          {...roundedAutofillDataSet}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.brand}
          underlineColorAndroid="transparent"
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
        />

        {rightElement && (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        )}
      </View>

      {error && (
        <RqllyText
          variant="caption"
          color="danger"
          style={styles.message}
        >
          {error}
        </RqllyText>
      )}

      {!error && hint && (
        <RqllyText
          variant="caption"
          color="tertiary"
          style={styles.message}
        >
          {hint}
        </RqllyText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.sm,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
	},

	input: {
		flex: 1,
		minHeight: 50,

		paddingHorizontal: spacing.lg,
		paddingVertical: 0,
		margin: 0,

		color: colors.textPrimary,
		fontSize: 16,
		lineHeight: 22,

		backgroundColor: 'transparent',

		// Important: no second/native-looking boundary
		borderWidth: 0,
		borderColor: 'transparent',
		borderRadius: 0,
    outlineColor: 'transparent',
    outlineStyle: 'none' as never,
    outlineWidth: 0,

		includeFontPadding: false,
	},

  inputWithLeftIcon: {
    paddingLeft: spacing.sm,
  },

  inputWithRightElement: {
    paddingRight: spacing.sm,
  },

  leftIcon: {
    marginLeft: spacing.md,
  },

  rightElement: {
    marginRight: spacing.md,
  },

  message: {
    marginTop: spacing.xs,
  },
});