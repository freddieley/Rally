import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyButton,
  RqllyIconButton,
  RqllyText,
  colors,
  radius,
  spacing,
} from '../../../components/ui';

import {
  Avatar,
  AvatarStack,
} from '../../../components/people';

type Party = {
  id: string;
  title: string;
  host: string;
  hostInitials: string;
  location: string;
  date: string;
  time: string;
  access: string;
  capacity: number;
  going: number;
  description: string;
  attendees: {
    id: string;
    name: string;
    presence?: 'online' | 'away' | 'offline';
  }[];
};

const PARTIES: Record<string, Party> = {
  'house-party': {
    id: 'house-party',
    title: 'House Party',
    host: 'Freddie',
    hostInitials: 'F',
    location: 'Southampton',
    date: 'Friday 27 Sept',
    time: '10:30 PM',
    access: 'Invite only',
    capacity: 50,
    going: 24,
    description:
      'Good people, good music and a proper night. Come through and bring your energy.',
    attendees: [
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'online',
      },
      {
        id: 'alex',
        name: 'Alex',
        presence: 'online',
      },
      {
        id: 'charlie',
        name: 'Charlie',
        presence: 'away',
      },
      {
        id: 'sam',
        name: 'Sam',
        presence: 'offline',
      },
      {
        id: 'jordan',
        name: 'Jordan',
        presence: 'online',
      },
      {
        id: 'olivia',
        name: 'Olivia',
        presence: 'online',
      },
    ],
  },

  rooftop: {
    id: 'rooftop',
    title: 'Rooftop Session',
    host: 'Alex',
    hostInitials: 'A',
    location: 'Southampton',
    date: 'Saturday 28 Sept',
    time: '8:00 PM',
    access: 'Friends',
    capacity: 30,
    going: 18,
    description:
      'Music, drinks and a sunset session above the city.',
    attendees: [
      {
        id: 'alex',
        name: 'Alex',
        presence: 'online',
      },
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'online',
      },
      {
        id: 'mia',
        name: 'Mia',
        presence: 'away',
      },
      {
        id: 'sam',
        name: 'Sam',
        presence: 'offline',
      },
    ],
  },

  'late-night': {
    id: 'late-night',
    title: 'Late Night',
    host: 'Charlie',
    hostInitials: 'C',
    location: 'Winchester',
    date: 'Saturday 28 Sept',
    time: '11:00 PM',
    access: 'Public',
    capacity: 80,
    going: 42,
    description:
      "Late night plans for people who aren't ready to call it a night.",
    attendees: [
      {
        id: 'charlie',
        name: 'Charlie',
        presence: 'online',
      },
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'online',
      },
      {
        id: 'alex',
        name: 'Alex',
        presence: 'away',
      },
      {
        id: 'olivia',
        name: 'Olivia',
        presence: 'online',
      },
    ],
  },
};

export default function PartyPage() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const party = useMemo(
    () => PARTIES[id ?? ''] ?? PARTIES['house-party'],
    [id],
  );

  const [joined, setJoined] = useState(false);

  const remaining = Math.max(
    party.capacity - party.going,
    0,
  );

  const handleJoin = () => {
    setJoined((current) => !current);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView
        edges={['top']}
        style={styles.safeArea}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}

          <View style={styles.topBar}>
            <RqllyIconButton
              variant="surface"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              icon={
                <RqllyText
                  variant="heading"
                  color="primary"
                  style={styles.backIcon}
                >
                  ‹
                </RqllyText>
              }
            />

            <RqllyText
              variant="caption"
              color="tertiary"
            >
              PARTY
            </RqllyText>

            <RqllyIconButton
              variant="surface"
              accessibilityLabel="More party options"
              icon={
                <RqllyText
                  variant="heading"
                  color="primary"
                  style={styles.moreIcon}
                >
                  •••
                </RqllyText>
              }
            />
          </View>

          {/* HERO */}

          <View style={styles.hero}>
            <View style={styles.statusRow}>
              <View style={styles.liveDot} />

              <RqllyText
                variant="caption"
                color="connection"
              >
                HAPPENING SOON
              </RqllyText>
            </View>

            <RqllyText
              variant="display"
              style={styles.title}
            >
              {party.title}
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
              style={styles.description}
            >
              {party.description}
            </RqllyText>
          </View>

          {/* MEDIA */}

          <View style={styles.media}>
            <View style={styles.mediaGlow} />

            <View style={styles.mediaContent}>
              <RqllyText
                variant="caption"
                color="tertiary"
              >
                PARTY MEDIA
              </RqllyText>

              <RqllyText
                variant="heading"
                color="primary"
                style={styles.mediaTitle}
              >
                Photos and videos
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
              >
                Media from this party will appear here.
              </RqllyText>
            </View>

            <View style={styles.mediaCorner} />
          </View>

          {/* HOST */}

          <View style={styles.section}>
            <RqllyText
              variant="caption"
              color="tertiary"
            >
              HOST
            </RqllyText>

            <View style={styles.hostRow}>
              <Avatar
                name={party.host}
                size="medium"
                presence="online"
              />

              <View style={styles.hostInfo}>
                <RqllyText variant="bodyMedium">
                  {party.host}
                </RqllyText>

                <RqllyText
                  variant="small"
                  color="secondary"
                >
                  Party host
                </RqllyText>
              </View>

              <Pressable
                onPress={() => {
                  // Messaging will be connected later.
                }}
                style={({ pressed }) => [
                  styles.hostMessage,
                  pressed && styles.pressed,
                ]}
              >
                <RqllyText
                  variant="caption"
                  color="primary"
                >
                  MESSAGE
                </RqllyText>
              </Pressable>
            </View>
          </View>

          {/* DETAILS */}

          <View style={styles.section}>
            <RqllyText
              variant="caption"
              color="tertiary"
            >
              DETAILS
            </RqllyText>

            <View style={styles.detailsGrid}>
              <PartyDetail
                label="WHEN"
                value={party.date}
                secondary={party.time}
              />

              <PartyDetail
                label="WHERE"
                value={party.location}
              />

              <PartyDetail
                label="ACCESS"
                value={party.access}
              />

              <PartyDetail
                label="CAPACITY"
                value={`${party.capacity} people`}
              />
            </View>
          </View>

          {/* PEOPLE */}

          <View style={styles.section}>
            <View style={styles.peopleHeader}>
              <View>
                <RqllyText
                  variant="caption"
                  color="tertiary"
                >
                  PEOPLE GOING
                </RqllyText>

                <RqllyText
                  variant="heading"
                  style={styles.peopleCount}
                >
                  {party.going + (joined ? 1 : 0)}
                  <RqllyText
                    variant="small"
                    color="secondary"
                  >
                    {' '}
                    / {party.capacity}
                  </RqllyText>
                </RqllyText>
              </View>

              <RqllyText
                variant="small"
                color="secondary"
              >
                {remaining} spots left
              </RqllyText>
            </View>

            <View style={styles.peopleRow}>
              <AvatarStack
                people={party.attendees.map((person) => ({
                  ...person,
                  presence:
                    person.presence === 'away'
                      ? 'offline'
                      : person.presence,
                }))}
                max={5}
                size="medium"
              />

              <RqllyText
                variant="small"
                color="secondary"
              >
                Tap to see everyone
              </RqllyText>
            </View>
          </View>

          {/* ACTIONS */}

          <View style={styles.actions}>
            <RqllyButton
              variant="primary"
              onPress={handleJoin}
            >
              {joined ? 'JOINED' : 'JOIN PARTY'}
            </RqllyButton>

            <RqllyButton
              variant="secondary"
              onPress={() => {
                // Messaging flow comes next.
              }}
            >
              MESSAGE HOST
            </RqllyButton>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PartyDetail({
  label,
  value,
  secondary,
}: {
  label: string;
  value: string;
  secondary?: string;
}) {
  return (
    <View style={styles.detail}>
      <RqllyText
        variant="caption"
        color="tertiary"
      >
        {label}
      </RqllyText>

      <RqllyText
        variant="bodyMedium"
        color="primary"
      >
        {value}
      </RqllyText>

      {secondary ? (
        <RqllyText
          variant="small"
          color="secondary"
        >
          {secondary}
        </RqllyText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  topBar: {
    height: 58,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: -2,
  },

  moreIcon: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
  },

  hero: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.connection,
  },

  title: {
    marginTop: spacing.md,

    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.6,
  },

  description: {
    maxWidth: 340,
    marginTop: spacing.md,
  },

  media: {
    height: 220,

    position: 'relative',
    overflow: 'hidden',

    borderRadius: radius.xl,
    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
  },

  mediaGlow: {
    position: 'absolute',

    width: 190,
    height: 190,

    right: -65,
    top: -70,

    borderRadius: radius.pill,

    backgroundColor: colors.brand,

    opacity: 0.14,
  },

  mediaContent: {
    flex: 1,

    justifyContent: 'flex-end',

    padding: spacing.xl,
  },

  mediaTitle: {
    marginTop: spacing.xs,
  },

  mediaCorner: {
    position: 'absolute',

    width: 90,
    height: 90,

    left: -35,
    bottom: -45,

    borderRadius: radius.pill,

    backgroundColor: colors.connection,

    opacity: 0.08,
  },

  section: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  hostRow: {
    marginTop: spacing.md,

    flexDirection: 'row',
    alignItems: 'center',
  },

  hostInfo: {
    flex: 1,

    marginLeft: spacing.md,
  },

  hostMessage: {
    minHeight: 38,

    paddingHorizontal: spacing.md,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.surfaceInteractive,
  },

  pressed: {
    opacity: 0.65,
  },

  detailsGrid: {
    marginTop: spacing.lg,

    flexDirection: 'row',
    flexWrap: 'wrap',

    rowGap: spacing.xl,
  },

  detail: {
    width: '50%',
    paddingRight: spacing.md,
  },

  peopleHeader: {
    marginTop: spacing.md,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  peopleCount: {
    marginTop: spacing.xs,
  },

  peopleRow: {
    marginTop: spacing.lg,

    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  actions: {
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },

  bottomSpace: {
    height: spacing.xxl,
  },
});