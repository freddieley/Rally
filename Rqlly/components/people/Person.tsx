import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Avatar } from './Avatar';
import type { AvatarPresence } from './Avatar';

export type PersonStatus =
  | 'default'
  | 'going'
  | 'online'
  | 'busy'
  | 'invited';

type PersonProps = {
  name: string;

  avatarUri?: string;

  context?: string;

  status?: PersonStatus;

  onPress?: () => void;
};

const STATUS_LABELS: Record<
  PersonStatus,
  string | undefined
> = {
  default: undefined,
  going: 'GOING',
  online: undefined,
  busy: undefined,
  invited: undefined,
};

function getPresence(
  status: PersonStatus,
): AvatarPresence | undefined {
  switch (status) {
    case 'going':
      return 'going';

    case 'online':
      return 'online';

    case 'busy':
      return 'busy';

    default:
      return undefined;
  }
}

export function Person({
  name,
  avatarUri,
  context,
  status = 'default',
  onPress,
}: PersonProps) {
  const presence = getPresence(status);

  const content = (
    <View style={styles.container}>
      <Avatar
        name={name}
        uri={avatarUri}
        size="medium"
        presence={presence}
        invited={status === 'invited'}
      />

      <View style={styles.text}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>

        {context ? (
          <Text
            style={styles.context}
            numberOfLines={1}
          >
            {context}
          </Text>
        ) : null}

        {status === 'going' ? (
          <View style={styles.goingBadge}>
            <Text style={styles.goingText}>
              {STATUS_LABELS.going}
            </Text>
          </View>
        ) : null}
      </View>

      {onPress ? (
        <Text style={styles.chevron}>
          ›
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
      ]}
      hitSlop={4}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 22,
  },

  container: {
    minHeight: 72,

    paddingHorizontal: 16,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 22,

    backgroundColor: '#141318',
  },

  text: {
    flex: 1,

    marginLeft: 13,

    minWidth: 0,
  },

  name: {
    fontSize: 16,
    lineHeight: 20,

    fontWeight: '700',

    color: '#F5F5F5',
  },

  context: {
    marginTop: 2,

    fontSize: 13,
    lineHeight: 17,

    color: '#A7A5AA',
  },

  goingBadge: {
    alignSelf: 'flex-start',

    marginTop: 6,

    paddingHorizontal: 9,
    paddingVertical: 3,

    borderRadius: 999,

    backgroundColor: '#1BE497',
  },

  goingText: {
    fontSize: 9,
    fontWeight: '900',

    letterSpacing: 0.8,

    color: '#0B0A0D',
  },

  chevron: {
    marginLeft: 12,

    fontSize: 28,
    lineHeight: 28,

    fontWeight: '300',

    color: '#6F6D74',
  },

  pressed: {
    opacity: 0.72,
  },
});