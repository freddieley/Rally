import React from 'react';
import {
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  sizes,
  spacing,
} from './tokens';

import { RqllyText } from './Text';

export interface RqllyTab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface RqllyTabBarProps {
  tabs: RqllyTab[];
  activeKey: string;
  onChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function RqllyTabBar({
  tabs,
  activeKey,
  onChange,
  style,
}: RqllyTabBarProps) {
  return (
    <View
      style={[
        {
          minHeight: sizes.tabBar,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          alignItems: 'stretch',
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const active = tab.key === activeKey;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            {tab.icon && (
              <View
                style={{
                  marginBottom: spacing.xs,
                }}
              >
                {tab.icon}
              </View>
            )}

            <RqllyText
              variant="caption"
              style={{
                color: active
                  ? colors.textPrimary
                  : colors.textTertiary,
              }}
            >
              {tab.label}
            </RqllyText>

            {active && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 3,
                  width: 24,
                  borderRadius: 3,
                  backgroundColor: colors.brand,
                }}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}