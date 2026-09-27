import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyBadge,
  RqllyBottomSheet,
  RqllyButton,
  RqllyCard,
  RqllyChip,
  RqllyDivider,
  RqllyEmptyState,
  RqllyHeader,
  RqllyIconButton,
  RqllyInput,
  RqllyLoading,
  RqllyModal,
  RqllySearchBar,
  RqllySurface,
  RqllyTabBar,
  RqllyText,
} from '../components/ui';

import {
  Avatar,
  AvatarStack,
  InviteManagement,
  Person,
} from '../components/people';

import type {
  AvatarPresence,
  AvatarStackPerson,
  InvitePerson,
} from '../components/people';

import { PartyCard } from '../components/PartyCard';

import {
  colors,
  spacing,
} from '../components/ui/tokens';

//router.push('/camera');

export default function Index() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedChip, setSelectedChip] = useState('All');

  const [activeTab, setActiveTab] = useState('discover');

  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [invites, setInvites] = useState<InvitePerson[]>([
    {
      id: '1',
      name: 'Alex',
      time: '2m ago',
    },
    {
      id: '2',
      name: 'Charlie',
      time: '8m ago',
    },
    {
      id: '3',
      name: 'Jordan',
      time: '15m ago',
    },
  ]);

  const [accepted, setAccepted] = useState<InvitePerson[]>([
    {
      id: '4',
      name: 'Sam',
      time: 'Yesterday',
    },
  ]);

  const [rejected, setRejected] = useState<InvitePerson[]>([
    {
      id: '5',
      name: 'Taylor',
      time: 'Yesterday',
    },
  ]);

  const avatarPeople: AvatarStackPerson[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Freddie',
        presence: 'going',
      },
      {
        id: '2',
        name: 'Alex',
        presence: 'online',
      },
      {
        id: '3',
        name: 'Charlie',
        presence: 'busy',
      },
      {
        id: '4',
        name: 'Jordan',
        presence: 'offline',
      },
      {
        id: '5',
        name: 'Sam',
        presence: 'online',
      },
      {
        id: '6',
        name: 'Taylor',
        presence: 'going',
      },
    ],
    [],
  );

  const presenceStates: AvatarPresence[] = [
    'online',
    'going',
    'busy',
    'offline',
  ];

  const handleAcceptInvite = (person: InvitePerson) => {
    setInvites((current) =>
      current.filter((item) => item.id !== person.id),
    );

    setAccepted((current) => [
      ...current,
      person,
    ]);
  };

  const handleRejectInvite = (person: InvitePerson) => {
    setInvites((current) =>
      current.filter((item) => item.id !== person.id),
    );

    setRejected((current) => [
      ...current,
      person,
    ]);
  };

  const simulateLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Rqlly', 'Loading complete.');
    }, 1200);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ------------------------------------------------ */}
        {/* HEADER                                           */}
        {/* ------------------------------------------------ */}

        <RqllyHeader
          title="Rqlly"
          subtitle="Component Lab"
          right={
            <RqllyIconButton
              variant="surface"
              accessibilityLabel="Open settings"
              icon={
                <RqllyText
                  variant="bodyMedium"
                  color="secondary"
                >
                  ⚙
                </RqllyText>
              }
              onPress={() =>
                Alert.alert('Settings', 'Settings pressed.')
              }
            />
          }
        />

        <View style={styles.intro}>
          <RqllyText variant="display">
            UI System
          </RqllyText>

          <RqllyText
            variant="body"
            color="secondary"
            style={styles.introText}
          >
            A live playground for the reusable Rqlly
            components and the visual language we're
            building around them.
          </RqllyText>
        </View>

        {/* ------------------------------------------------ */}
        {/* TYPOGRAPHY                                       */}
        {/* ------------------------------------------------ */}

        <Section title="Typography">
          <RqllySurface
            variant="elevated"
            style={styles.sectionSurface}
          >
            <RqllyText variant="display">
              Display
            </RqllyText>

            <RqllyText variant="title">
              Title
            </RqllyText>

            <RqllyText variant="heading">
              Heading
            </RqllyText>

            <RqllyText variant="body">
              Body text for normal application content.
            </RqllyText>

            <RqllyText
              variant="small"
              color="secondary"
            >
              Secondary supporting information.
            </RqllyText>

            <RqllyText
              variant="caption"
              color="brand"
            >
              RQLLY CAPTION
            </RqllyText>
          </RqllySurface>
        </Section>

        {/* ------------------------------------------------ */}
        {/* BUTTONS                                          */}
        {/* ------------------------------------------------ */}

        <Section title="Buttons">
          <View style={styles.rowWrap}>
            <RqllyButton
              onPress={() =>
                Alert.alert('Primary', 'Primary pressed.')
              }
            >
              Continue
            </RqllyButton>

            <RqllyButton
              variant="secondary"
              onPress={() =>
                Alert.alert('Secondary', 'Secondary pressed.')
              }
            >
              Secondary
            </RqllyButton>

            <RqllyButton
              variant="ghost"
              onPress={() =>
                Alert.alert('Ghost', 'Ghost pressed.')
              }
            >
              Skip
            </RqllyButton>

            <RqllyButton
              variant="destructive"
              onPress={() =>
                Alert.alert('Delete', 'Destructive action.')
              }
            >
              Delete
            </RqllyButton>
          </View>

          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            Sizes
          </RqllyText>

          <View style={styles.columnGap}>
            <RqllyButton size="small">
              Small
            </RqllyButton>

            <RqllyButton size="medium">
              Medium
            </RqllyButton>

            <RqllyButton size="large">
              Large
            </RqllyButton>
          </View>

          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            States
          </RqllyText>

          <View style={styles.columnGap}>
            <RqllyButton
              loading
              fullWidth
            >
              Loading
            </RqllyButton>

            <RqllyButton
              disabled
              fullWidth
            >
              Disabled
            </RqllyButton>
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* ICON BUTTONS                                     */}
        {/* ------------------------------------------------ */}

        <Section title="Icon Buttons">
          <View style={styles.iconRow}>
            <RqllyIconButton
              icon={
                <RqllyText
                  variant="bodyMedium"
                  color="primary"
                >
                  +
                </RqllyText>
              }
              accessibilityLabel="Add"
            />

            <RqllyIconButton
              variant="surface"
              icon={
                <RqllyText
                  variant="bodyMedium"
                  color="primary"
                >
                  •••
                </RqllyText>
              }
              accessibilityLabel="More"
            />

            <RqllyIconButton
              variant="brand"
              icon={
                <RqllyText
                  variant="bodyMedium"
                  color="primary"
                >
                  +
                </RqllyText>
              }
              accessibilityLabel="Create"
            />
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* INPUTS                                           */}
        {/* ------------------------------------------------ */}

        <Section title="Inputs">
          <View style={styles.columnGap}>
            <RqllyInput
              label="Name"
              placeholder="Your name"
              value={inputValue}
              onChangeText={setInputValue}
            />

            <RqllyInput
              label="Email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <RqllyInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
            />

            <RqllyInput
              label="Error state"
              placeholder="Something went wrong"
              error="This field needs attention."
            />

            <RqllyInput
              label="With hint"
              placeholder="Username"
              hint="Choose something people will recognise you by."
            />

            <RqllyInput
              label="Disabled"
              placeholder="Unavailable"
              editable={false}
            />
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* SEARCH                                           */}
        {/* ------------------------------------------------ */}

        <Section title="Search">
          <RqllySearchBar
            placeholder="Search people, places and parties..."
            value={searchValue}
            onChangeText={setSearchValue}
            onClear={() => setSearchValue('')}
          />

          {searchValue.length > 0 && (
            <RqllyText
              variant="small"
              color="secondary"
              style={styles.searchResult}
            >
              Searching for "{searchValue}"
            </RqllyText>
          )}
        </Section>

        {/* ------------------------------------------------ */}
        {/* BADGES + CHIPS                                   */}
        {/* ------------------------------------------------ */}

        <Section title="Badges & Chips">
          <View style={styles.rowWrap}>
            <RqllyBadge variant="brand">
              NEW
            </RqllyBadge>

            <RqllyBadge variant="connection">
              ONLINE
            </RqllyBadge>

            <RqllyBadge variant="success">
              GOING
            </RqllyBadge>

            <RqllyBadge variant="warning">
              PENDING
            </RqllyBadge>

            <RqllyBadge variant="danger">
              REJECTED
            </RqllyBadge>

            <RqllyBadge variant="neutral">
              OFFLINE
            </RqllyBadge>
          </View>

          <View style={styles.chipRow}>
            {['All', 'Friends', 'Parties', 'Places'].map(
              (chip) => (
                <RqllyChip
                  key={chip}
                  selected={selectedChip === chip}
                  onPress={() => setSelectedChip(chip)}
                >
                  {chip}
                </RqllyChip>
              ),
            )}
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* SURFACES + CARD                                  */}
        {/* ------------------------------------------------ */}

        <Section title="Surfaces">
          <View style={styles.columnGap}>
            <RqllySurface
              style={styles.demoSurface}
            >
              <RqllyText variant="heading">
                Default Surface
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
              >
                The standard Rqlly surface.
              </RqllyText>
            </RqllySurface>

            <RqllySurface
              variant="elevated"
              style={styles.demoSurface}
            >
              <RqllyText variant="heading">
                Elevated Surface
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
              >
                Used when something needs to sit above
                the normal canvas.
              </RqllyText>
            </RqllySurface>

            <RqllySurface
              variant="interactive"
              onPress={() =>
                Alert.alert(
                  'Interactive surface',
                  'Surface pressed.',
                )
              }
              style={styles.demoSurface}
            >
              <RqllyText variant="heading">
                Interactive Surface
              </RqllyText>

              <RqllyText
                variant="small"
                color="secondary"
              >
                Press me.
              </RqllyText>
            </RqllySurface>

            <RqllyCard elevated>
              <RqllyText variant="heading">
                Rqlly Card
              </RqllyText>

              <RqllyText
                variant="body"
                color="secondary"
                style={styles.cardText}
              >
                A generic content container. Unlike PartyCard,
                this is deliberately neutral.
              </RqllyText>
            </RqllyCard>
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* DIVIDER                                          */}
        {/* ------------------------------------------------ */}

        <Section title="Divider">
          <RqllyText variant="body">
            Content above
          </RqllyText>

          <RqllyDivider spacing={spacing.lg} />

          <RqllyText
            variant="body"
            color="secondary"
          >
            Content below
          </RqllyText>
        </Section>

        {/* ------------------------------------------------ */}
        {/* PARTY CARD                                       */}
        {/* ------------------------------------------------ */}

        <Section title="Party">
          <PartyCard
            title="House Party"
            host="Freddie"
            location="Southampton"
            date="Friday 27 Sept"
            time="10:30 PM"
            onOpen={() =>
              Alert.alert(
                'House Party',
                'Party opened.',
              )
            }
            onRegister={() =>
              Alert.alert(
                'House Party',
                'Registration pressed.',
              )
            }
          />
        </Section>

        {/* ------------------------------------------------ */}
        {/* PEOPLE                                           */}
        {/* ------------------------------------------------ */}

        <Section title="People">
          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            Avatar sizes
          </RqllyText>

          <View style={styles.avatarRow}>
            <Avatar
              name="Freddie"
              size="large"
              presence="going"
            />

            <Avatar
              name="Alex"
              size="medium"
              presence="online"
            />

            <Avatar
              name="Charlie"
              size="small"
              presence="busy"
            />

            <Avatar
              name="Jordan"
              size="medium"
              invited
            />
          </View>

          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            Presence
          </RqllyText>

          <View style={styles.avatarRow}>
            {presenceStates.map((presence) => (
              <View
                key={presence}
                style={styles.presenceExample}
              >
                <Avatar
                  name={presence}
                  size="medium"
                  presence={presence}
                />

                <RqllyText
                  variant="caption"
                  color="secondary"
                  style={styles.presenceLabel}
                >
                  {presence.toUpperCase()}
                </RqllyText>
              </View>
            ))}
          </View>

          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            Avatar stack
          </RqllyText>

          <AvatarStack
            people={avatarPeople}
            max={5}
            size="medium"
            onPress={() =>
              Alert.alert(
                'People',
                'Avatar stack pressed.',
              )
            }
          />

          <RqllyText
            variant="small"
            color="tertiary"
            style={styles.label}
          >
            Person states
          </RqllyText>

          <View style={styles.columnGap}>
            <Person
              name="Freddie"
              context="Host"
              status="going"
            />

            <Person
              name="Alex"
              context="Online now"
              status="online"
            />

            <Person
              name="Charlie"
              context="Busy"
              status="busy"
            />

            <Person
              name="Jordan"
              context="Invitation pending"
              status="invited"
            />

            <Person
              name="Sam"
              context="No current status"
              status="default"
            />
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* INVITE MANAGEMENT                                */}
        {/* ------------------------------------------------ */}

        <Section title="Invite Management">
          <RqllySurface
            variant="elevated"
            style={styles.inviteContainer}
          >
            <InviteManagement
              invites={invites}
              accepted={accepted}
              rejected={rejected}
              onAccept={handleAcceptInvite}
              onReject={handleRejectInvite}
              onPersonPress={(person) =>
                Alert.alert(
                  person.name,
                  'Person selected.',
                )
              }
            />
          </RqllySurface>
        </Section>

        {/* ------------------------------------------------ */}
        {/* TABS                                             */}
        {/* ------------------------------------------------ */}

        <Section title="Tabs">
          <RqllyTabBar
            tabs={[
              {
                key: 'discover',
                label: 'Discover',
              },
              {
                key: 'friends',
                label: 'Friends',
              },
              {
                key: 'messages',
                label: 'Messages',
              },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />

          <RqllyText
            variant="small"
            color="secondary"
            style={styles.tabFeedback}
          >
            Selected: {activeTab}
          </RqllyText>
        </Section>

        {/* ------------------------------------------------ */}
        {/* LOADING                                          */}
        {/* ------------------------------------------------ */}

        <Section title="Loading">
          <RqllyLoading
            size="large"
            label="Finding something to do..."
          />

          <RqllyButton
            variant="secondary"
            onPress={simulateLoading}
            loading={loading}
            fullWidth
          >
            Test Loading
          </RqllyButton>
        </Section>

        {/* ------------------------------------------------ */}
        {/* EMPTY STATE                                      */}
        {/* ------------------------------------------------ */}

        <Section title="Empty State">
          <RqllySurface variant="elevated">
            <RqllyEmptyState
              title="Nothing here yet"
              description="When you haven't got anything to show, Rqlly can keep the interface quiet instead of filling it with unnecessary UI."
              action={
                <RqllyButton
                  onPress={() =>
                    Alert.alert(
                      'Create',
                      'Create something new.',
                    )
                  }
                >
                  Create something
                </RqllyButton>
              }
            />
          </RqllySurface>
        </Section>

        {/* ------------------------------------------------ */}
        {/* MODAL + BOTTOM SHEET                             */}
        {/* ------------------------------------------------ */}

        <Section title="Overlays">
          <View style={styles.columnGap}>
            <RqllyButton
              variant="secondary"
              fullWidth
              onPress={() => setModalVisible(true)}
            >
              Open Modal
            </RqllyButton>

            <RqllyButton
              variant="secondary"
              fullWidth
              onPress={() => setSheetVisible(true)}
            >
              Open Bottom Sheet
            </RqllyButton>
          </View>
        </Section>

        {/* ------------------------------------------------ */}
        {/* FOOTER                                           */}
        {/* ------------------------------------------------ */}

        <View style={styles.footer}>
          <RqllyText
            variant="caption"
            color="tertiary"
            align="center"
          >
            RQLLY UI SYSTEM
          </RqllyText>

          <RqllyText
            variant="small"
            color="tertiary"
            align="center"
            style={styles.footerText}
          >
            Dark. Social. Tactile. Deliberate.
          </RqllyText>
        </View>
      </ScrollView>

      {/* -------------------------------------------------- */}
      {/* MODAL                                              */}
      {/* -------------------------------------------------- */}

      <RqllyModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Rqlly Modal"
      >
        <RqllyText
          variant="body"
          color="secondary"
        >
          This is the reusable modal component. It can
          contain any Rqlly components.
        </RqllyText>

        <RqllyButton
          fullWidth
          style={styles.overlayButton}
          onPress={() => setModalVisible(false)}
        >
          Done
        </RqllyButton>
      </RqllyModal>

      {/* -------------------------------------------------- */}
      {/* BOTTOM SHEET                                       */}
      {/* -------------------------------------------------- */}

      <RqllyBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="House Party"
      >
        <View style={styles.sheetContent}>
          <RqllyText
            variant="body"
            color="secondary"
          >
            What would you like to do?
          </RqllyText>

          <RqllyButton
            variant="ghost"
            fullWidth
            style={styles.sheetButton}
            onPress={() => {
              setSheetVisible(false);
              Alert.alert('Invite', 'Invite friends.');
            }}
          >
            Invite friends
          </RqllyButton>

          <RqllyButton
            variant="ghost"
            fullWidth
            style={styles.sheetButton}
            onPress={() => {
              setSheetVisible(false);
              Alert.alert('Share', 'Share party.');
            }}
          >
            Share party
          </RqllyButton>

          <RqllyButton
            variant="ghost"
            fullWidth
            style={styles.sheetButton}
            onPress={() => {
              setSheetVisible(false);
              Alert.alert('Edit', 'Edit party.');
            }}
          >
            Edit party
          </RqllyButton>

          <RqllyButton
            variant="destructive"
            fullWidth
            style={styles.sheetButton}
            onPress={() => setSheetVisible(false)}
          >
            Leave party
          </RqllyButton>
        </View>
      </RqllyBottomSheet>
    </SafeAreaView>
  );
}

/* ======================================================== */
/* SECTION                                                */
/* ======================================================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <RqllyText
        variant="heading"
        style={styles.sectionTitle}
      >
        {title}
      </RqllyText>

      {children}
    </View>
  );
}

/* ======================================================== */
/* STYLES                                                 */
/* ======================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  content: {
    paddingBottom: 64,
  },

  intro: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  introText: {
    marginTop: spacing.sm,
    maxWidth: 500,
  },

  section: {
    marginBottom: spacing.xxxl,
  },

  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  sectionSurface: {
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
    gap: spacing.md,
  },

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  columnGap: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  label: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  searchResult: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },

  demoSurface: {
    padding: spacing.lg,
    gap: spacing.xs,
  },

  cardText: {
    marginTop: spacing.sm,
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },

  presenceExample: {
    alignItems: 'center',
  },

  presenceLabel: {
    marginTop: spacing.xs,
  },

  inviteContainer: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
  },

  tabFeedback: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  overlayButton: {
    marginTop: spacing.xl,
  },

  sheetContent: {
    gap: spacing.sm,
  },

  sheetButton: {
    marginTop: spacing.xs,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },

  footerText: {
    marginTop: spacing.xs,
  },
});