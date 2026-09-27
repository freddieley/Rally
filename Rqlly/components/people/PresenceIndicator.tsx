import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import type {
  AvatarPresence,
  AvatarSize,
} from './Avatar';

type PresenceIndicatorProps = {
  presence: AvatarPresence;
  size?: AvatarSize;
};

const COLORS = {
  going: '#1BE497',
  online: '#1BCDE4',
  busy: '#FFD34D',
  offline: '#6F6D74',
};

const DOT_SIZES = {
  large: 13,
  medium: 11,
  small: 8,
};

export function PresenceIndicator({
  presence,
  size = 'medium',
}: PresenceIndicatorProps) {
  const dotSize = DOT_SIZES[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: dotSize + 4,
          height: dotSize + 4,
          borderRadius: (dotSize + 4) / 2,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: COLORS[presence],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    right: -1,
    bottom: -1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#141318',
  },

  dot: {},
});