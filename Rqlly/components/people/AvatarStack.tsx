import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Avatar } from './Avatar';
import type { AvatarProps } from './Avatar';

export type AvatarStackPerson = {
  id: string;
  name: string;
  uri?: string;
  presence?: AvatarProps['presence'];
};

type AvatarStackProps = {
  people: AvatarStackPerson[];

  max?: number;

  size?: AvatarProps['size'];

  onPress?: () => void;
};

export function AvatarStack({
  people,
  max = 4,
  size = 'medium',
  onPress,
}: AvatarStackProps) {
  const visiblePeople = people.slice(0, max);
  const remaining = Math.max(
    people.length - visiblePeople.length,
    0,
  );

  const content = (
    <View style={styles.row}>
      {visiblePeople.map((person, index) => (
        <View
          key={person.id}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : -10,
              zIndex: visiblePeople.length - index,
            },
          ]}
        >
          <Avatar
            name={person.name}
            uri={person.uri}
            size={size}
            presence={person.presence}
          />
        </View>
      ))}

      {remaining > 0 ? (
        <View
          style={[
            styles.remaining,
            styles.avatarWrapper,
            {
              marginLeft: -10,
            },
          ]}
        >
          <Text style={styles.remainingText}>
            +{remaining}
          </Text>
        </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrapper: {
    borderRadius: 999,

    borderWidth: 2,
    borderColor: '#0B0A0D',
  },

  remaining: {
    width: 44,
    height: 44,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#1C1A21',
  },

  remainingText: {
    fontSize: 13,
    fontWeight: '800',

    color: '#F5F5F5',
  },

  pressed: {
    opacity: 0.72,
  },
});