import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PresenceIndicator } from './PresenceIndicator';
import { InviteIcon } from './InviteIcon';

export type AvatarSize = 'large' | 'medium' | 'small';

export type AvatarPresence =
  | 'online'
  | 'going'
  | 'busy'
  | 'offline';

export type AvatarProps = {
  uri?: string;
  name?: string;

  size?: AvatarSize;

  presence?: AvatarPresence;

  invited?: boolean;
  selected?: boolean;

  onPress?: () => void;
};

const SIZES = {
  large: 56,
  medium: 44,
  small: 32,
};

function getInitials(name?: string) {
  if (!name) {
    return '?';
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({
  uri,
  name,

  size = 'medium',

  presence,

  invited = false,
  selected = false,

  onPress,
}: AvatarProps) {
  const dimension = SIZES[size];

  const content = (
    <View
      style={[
        styles.avatar,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
        selected && styles.selected,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              size === 'large' && styles.initialsLarge,
              size === 'small' && styles.initialsSmall,
            ]}
          >
            {getInitials(name)}
          </Text>
        </View>
      )}

      {presence ? (
        <PresenceIndicator
          presence={presence}
          size={size}
        />
      ) : null}

      {invited ? (
        <InviteIcon size={size} />
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: 'relative',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#24212A',
  },

  fallback: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#1C1A21',
  },

  initials: {
    fontSize: 14,
    fontWeight: '800',

    letterSpacing: 0.2,

    color: '#F5F5F5',
  },

  initialsLarge: {
    fontSize: 18,
  },

  initialsSmall: {
    fontSize: 10,
  },

  selected: {
    borderWidth: 2,
    borderColor: '#E41BCD',
  },

  pressed: {
    opacity: 0.72,
  },
});