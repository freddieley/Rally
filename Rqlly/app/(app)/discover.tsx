import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyIconButton,
  RqllyText,
  colors,
  spacing,
} from '../../components/ui';

import { Avatar } from '../../components/people';
import { PartyCard } from '../../components/PartyCard';
import { RqllyScreen } from '../../components/motion/RqllyScreen';
import { motion } from '../../components/motion/motion';

type DiscoveryTab = 'for-you' | 'friends' | 'nearby';

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
};

const parties: DemoParty[] = [
  {
    id: 'house-party',
    title: 'House Party',
    host: 'Freddie',
    location: 'Southampton',
    date: 'Friday 27 Sept',
    time: '10:30 PM',
  },
  {
    id: 'rooftop',
    title: 'Rooftop Session',
    host: 'Alex',
    location: 'Southampton',
    date: 'Saturday 28 Sept',
    time: '8:00 PM',
  },
  {
    id: 'late-night',
    title: 'Late Night',
    host: 'Charlie',
    location: 'Winchester',
    date: 'Saturday 28 Sept',
    time: '11:00 PM',
  },
];

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] =
    useState<DiscoveryTab>('for-you');

  const [joined, setJoined] =
    useState<string[]>([]);

  const handleJoin = (partyId: string) => {
    setJoined((current) =>
      current.includes(partyId)
        ? current
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
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}

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
                  style={styles.headerSubtitle}
                >
                  What's happening?
                </RqllyText>
              </View>

              <View style={styles.headerActions}>
                <RqllyIconButton
                  variant="surface"
                  accessibilityLabel="Search"
                  icon={
                    <RqllyText
                      variant="bodyMedium"
                      color="primary"
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
                    router.push('/profile')
                  }
                />
              </View>
            </View>
          </RqllyScreen>

          {/* DISCOVERY TABS */}

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
                      setActiveTab(tab.key)
                    }
                    style={styles.tab}
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

                    {active && (
                      <View
                        style={styles.tabIndicator}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </RqllyScreen>

          {/* INTRO */}

          <RqllyScreen
            delay={motion.delay.second}
          >
            <View style={styles.sectionHeader}>
              <View>
                <RqllyText variant="heading">
                  {activeTab === 'for-you'
                    ? 'Happening now'
                    : activeTab === 'friends'
                      ? 'Your people'
                      : 'Around you'}
                </RqllyText>

                <RqllyText
                  variant="small"
                  color="secondary"
                  style={styles.sectionSubtitle}
                >
                  {activeTab === 'for-you'
                    ? 'Plans you might want to join.'
                    : activeTab === 'friends'
                      ? 'See what your friends are doing.'
                      : 'Things happening nearby.'}
                </RqllyText>
              </View>

              <RqllyText
                variant="caption"
                color="connection"
              >
                LIVE
              </RqllyText>
            </View>
          </RqllyScreen>

          {/* PARTY FEED */}

          <View style={styles.partyList}>
            {parties.map((party, index) => (
              <RqllyScreen
                key={party.id}
                delay={
                  motion.delay.third +
                  index * 70
                }
              >
                <PartyCard
                  title={party.title}
                  host={party.host}
                  location={party.location}
                  date={party.date}
                  time={party.time}
                  registered={joined.includes(
                    party.id,
                  )}
                  onRegister={() =>
                    handleJoin(party.id)
                  }
                  onOpen={() =>
                    router.push({
                      pathname: "/(app)/party/[id]",
                      params: { id: party.id },
                    })
                  }
                />
              </RqllyScreen>
            ))}
          </View>

          {/* DISCOVERY FOOTER */}

          <RqllyScreen
            delay={motion.delay.sixth}
          >
            <View style={styles.footer}>
              <View style={styles.footerLine} />

              <RqllyText
                variant="caption"
                color="tertiary"
                align="center"
              >
                MORE IS HAPPENING
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
                align="center"
                style={styles.footerText}
              >
                Keep exploring.
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
    backgroundColor: colors.canvas,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,

    paddingBottom: 130,
  },

  header: {
    minHeight: 68,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -1.4,
  },

  headerSubtitle: {
    marginTop: 1,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: spacing.xl,
    marginBottom: spacing.xl,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  tab: {
    position: 'relative',

    marginRight: spacing.xl,

    paddingBottom: spacing.md,
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

    borderRadius: 999,

    backgroundColor: colors.brand,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    marginBottom: spacing.lg,
  },

  sectionSubtitle: {
    marginTop: 3,
  },

  partyList: {
    gap: spacing.lg,
  },

  footer: {
    alignItems: 'center',

    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },

  footerLine: {
    width: 42,
    height: 1,

    marginBottom: spacing.md,

    backgroundColor: colors.borderStrong,
  },

  footerText: {
    marginTop: spacing.xs,
  },
});