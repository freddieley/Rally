import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Svg, {
  Path,
} from 'react-native-svg';

import type { AvatarSize } from './Avatar';

type InviteIconProps = {
  size?: AvatarSize;
};

const DIMENSIONS = {
  large: 21,
  medium: 18,
  small: 14,
};

export function InviteIcon({
  size = 'medium',
}: InviteIconProps) {
  const dimension = DIMENSIONS[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
      ]}
    >
      <Svg
        width={dimension * 0.58}
        height={dimension * 0.58}
        viewBox="0 0 24 24"
      >
        <Path
          d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13C4.67 19 4 18.33 4 17.5v-11Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        <Path
          d="m5 7 7 5 7-5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    right: -2,
    bottom: 0,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#E41BCD',

    borderWidth: 2,
    borderColor: '#141318',
  },
});