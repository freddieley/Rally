import React, {
  useState,
} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  router,
} from 'expo-router';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  RqllyIconButton,
  RqllyText,
  colors,
  radius,
  spacing,
} from '../../components/ui';

import {
  Avatar,
} from '../../components/people';

import {
  PartyCard,
} from '../../components/PartyCard';

import {
  RqllyScreen,
} from '../../components/motion/RqllyScreen';

import {
  motion,
} from '../../components/motion/motion';

type DiscoveryTab =
  | 'for-you'
  | 'friends'
  | 'nearby';

const tabs: {
  key: DiscoveryTab;
  label: string;
}[] = [
  {
    key: 'for-you',
    label: 'For You',
  },
  {
    key: 'friends',
    label: 'Friends',
  },
  {
    key: 'nearby',
    label: 'Nearby',
  },
];

type DemoParty = {
  id: string;
  title: string;
  host: string;
  location: string;
  date: string;
  time: string;
  going: number;
  capacity: number;
  access: string;
  attendees: {
    id: string;
    name: string;
    presence?:
      | 'online'
      | 'going'
      | 'busy'
      | 'offline';
  }[];
};

const parties: DemoParty[] = [
  {
    id: 'house-party',
    title: 'House Party',
    host: 'Freddie',
    location: 'Southampton',
    date: 'Friday 27 Sept',
    time: '10:30 PM',
    going: 24,
    capacity: 50,
    access: 'Invite only',
    attendees: [
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'online',
      },
      {
        id: 'alex',
        name: 'Alex',
        presence: 'going',
      },
      {
        id: 'charlie',
        name: 'Charlie',
        presence: 'online',
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
        presence: 'going',
      },
    ],
  },

  {
    id: 'rooftop',
    title: 'Rooftop Session',
    host: 'Alex',
    location: 'Southampton',
    date: 'Saturday 28 Sept',
    time: '8:00 PM',
    going: 18,
    capacity: 30,
    access: 'Friends',
    attendees: [
      {
        id: 'alex',
        name: 'Alex',
        presence: 'online',
      },
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'going',
      },
      {
        id: 'mia',
        name: 'Mia',
        presence: 'online',
      },
      {
        id: 'sam',
        name: 'Sam',
        presence: 'offline',
      },
    ],
  },

  {
    id: 'late-night',
    title: 'Late Night',
    host: 'Charlie',
    location: 'Winchester',
    date: 'Saturday 28 Sept',
    time: '11:00 PM',
    going: 42,
    capacity: 80,
    access: 'Public',
    attendees: [
      {
        id: 'charlie',
        name: 'Charlie',
        presence: 'online',
      },
      {
        id: 'freddie',
        name: 'Freddie',
        presence: 'going',
      },
      {
        id: 'alex',
        name: 'Alex',
        presence: 'online',
      },
      {
        id: 'olivia',
        name: 'Olivia',
        presence: 'going',
      },
    ],
  },
];

export default function DiscoverScreen() {
  const [
    activeTab,
    setActiveTab,
  ] = useState<DiscoveryTab>(
    'for-you',
  );

  const [
    joined,
    setJoined,
  ] = useState<string[]>([]);

  const handleJoin = (
    partyId: string,
  ) => {
    setJoined((current) =>
      current.includes(partyId)
        ? current.filter(
            (id) => id !== partyId,
          )
        : [...current, partyId],
    );
  };

  return (
    <View style={styles.root}>
      <SafeAreaView
        edges={['top']}
        style={styles.safeArea}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }
        >
          {/* ==================================================
              HEADER
              ================================================== */}

          <RqllyScreen>
            <View style={styles.header}>
              <View>
                <RqllyText
                  variant="display"
                  style={styles.logo}
                >
                  Rqlly
                </RqllyText>

                <RqllyText
                  variant="small"
                  color="secondary"
                  style={styles.subtitle}
                >
                  What's happening?
                </RqllyText>
              </View>

              <View
                style={styles.headerActions}
              >
                <RqllyIconButton
                  variant="surface"
                  size="medium"
                  accessibilityLabel="Search"
                  icon={
                    <RqllyText
                      variant="bodyMedium"
                      color="primary"
                      style={styles.searchIcon}
                    >
                      ⌕
                    </RqllyText>
                  }
                />

                <Avatar
                  name="Freddie"
                  size="medium"
                  presence="online"
                  onPress={() =>
                    router.push(
                      '/profile',
                    )
                  }
                />
              </View>
            </View>
          </RqllyScreen>

          {/* ==================================================
              DISCOVERY TABS
              ================================================== */}

          <RqllyScreen
            delay={motion.delay.first}
          >
            <View style={styles.tabs}>
              {tabs.map((tab) => {
                const active =
                  activeTab === tab.key;

                return (
                  <Pressable
                    key={tab.key}
                    onPress={() =>
                      setActiveTab(
                        tab.key,
                      )
                    }
                    style={({ pressed }) => [
                      styles.tab,
                      pressed &&
                        styles.tabPressed,
                    ]}
                    accessibilityRole="tab"
                    accessibilityState={{
                      selected: active,
                    }}
                  >
                    <RqllyText
                      variant="small"
                      color={
                        active
                          ? 'primary'
                          : 'tertiary'
                      }
                      style={[
                        styles.tabText,
                        active &&
                          styles.tabTextActive,
                      ]}
                    >
                      {tab.label}
                    </RqllyText>

                    <View
                      style={[
                        styles.tabIndicator,
                        {
                          opacity:
                            active
                              ? 1
                              : 0,
                        },
                      ]}
                    />
                  </Pressable>
                );
              })}
            </View>
          </RqllyScreen>

          {/* ==================================================
              SECTION HEADING
              ================================================== */}

          <RqllyScreen
            delay={motion.delay.second}
          >
            <View
              style={
                styles.sectionHeader
              }
            >
              <View
                style={
                  styles.sectionHeading
                }
              >
                <RqllyText
                  variant="heading"
                  style={styles.sectionTitle}
                >
                  {activeTab ===
                  'for-you'
                    ? 'Plans for you'
                    : activeTab ===
                        'friends'
                      ? 'Your people'
                      : 'Nearby'}
                </RqllyText>

                <RqllyText
                  variant="small"
                  color="secondary"
                >
                  {activeTab ===
                  'for-you'
                    ? 'Things you might want to join.'
                    : activeTab ===
                        'friends'
                      ? 'See what your friends are doing.'
                      : 'Things happening around you.'}
                </RqllyText>
              </View>
            </View>
          </RqllyScreen>

          {/* ==================================================
              PARTY FEED
              ================================================== */}

          <View style={styles.partyList}>
            {parties.map(
              (party, index) => {
                const isJoined =
                  joined.includes(
                    party.id,
                  );

                return (
                  <RqllyScreen
                    key={party.id}
                    delay={
                      motion.delay.third +
                      index * 70
                    }
                  >
                    <PartyCard
                      title={
                        party.title
                      }
                      host={
                        party.host
                      }
                      location={
                        party.location
                      }
                      date={
                        party.date
                      }
                      time={
                        party.time
                      }
                      attendees={
                        party.attendees
                      }
                      going={
                        party.going +
                        (isJoined
                          ? 1
                          : 0)
                      }
                      capacity={
                        party.capacity
                      }
                      access={
                        party.access
                      }
                      registered={
                        isJoined
                      }
                      onRegister={() =>
                        handleJoin(
                          party.id,
                        )
                      }
                      onOpen={() =>
                        router.push({
                          pathname:
                            '/(app)/party/[id]',
                          params: {
                            id: party.id,
                          },
                        })
                      }
                    />
                  </RqllyScreen>
                );
              },
            )}
          </View>

          {/* ==================================================
              FOOTER
              ================================================== */}

          <RqllyScreen
            delay={motion.delay.sixth}
          >
            <View
              style={styles.footer}
            >
              <View
                style={styles.footerLine}
              />

              <RqllyText
                variant="caption"
                color="tertiary"
                align="center"
              >
                THAT'S ALL FOR NOW
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
                align="center"
                style={styles.footerText}
              >
                Check back later for more.
              </RqllyText>
            </View>
          </RqllyScreen>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor:
      colors.canvas,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal:
      spacing.lg,

    paddingTop:
      spacing.sm,

    paddingBottom: 132,
  },

  header: {
    minHeight: 66,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  logo: {
    fontSize: 31,
    lineHeight: 36,

    fontWeight: '700',

    letterSpacing: -1.35,
  },

  subtitle: {
    marginTop: 1,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: spacing.sm,
  },

  searchIcon: {
    fontSize: 19,
    lineHeight: 22,
  },

  tabs: {
    height: 48,

    marginTop:
      spacing.lg,

    flexDirection: 'row',
    alignItems: 'stretch',

    borderBottomWidth: 1,
    borderBottomColor:
      colors.border,
  },

  tab: {
    position: 'relative',

    minWidth: 72,

    marginRight:
      spacing.xl,

    alignItems: 'flex-start',
    justifyContent:
      'center',
  },

  tabPressed: {
    opacity: 0.65,
  },

  tabText: {
    fontWeight: '600',
  },

  tabTextActive: {
    fontWeight: '700',
  },

  tabIndicator: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: -1,

    height: 2,

    borderRadius:
      radius.pill,

    backgroundColor:
      colors.brand,
  },

  sectionHeader: {
    paddingTop:
      spacing.xl,

    paddingBottom:
      spacing.lg,
  },

  sectionHeading: {
    gap: 2,
  },

  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
  },

  partyList: {
    gap: spacing.lg,
  },

  footer: {
    alignItems: 'center',

    paddingTop:
      spacing.xxxl,

    paddingBottom:
      spacing.xl,
  },

  footerLine: {
    width: 38,
    height: 1,

    marginBottom:
      spacing.md,

    backgroundColor:
      colors.borderStrong,
  },

  footerText: {
    marginTop:
      spacing.xs,
  },
});