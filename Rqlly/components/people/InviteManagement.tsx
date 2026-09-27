import React, {
  useMemo,
  useState,
} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Avatar } from './Avatar';

export type InviteStatus =
  | 'pending'
  | 'accepted'
  | 'rejected';

export type InvitePerson = {
  id: string;

  name: string;

  avatarUri?: string;

  time?: string;
};

type InviteManagementProps = {
  invites: InvitePerson[];

  accepted: InvitePerson[];

  rejected: InvitePerson[];

  onAccept?: (person: InvitePerson) => void;

  onReject?: (person: InvitePerson) => void;

  onPersonPress?: (
    person: InvitePerson,
  ) => void;
};

type Tab = InviteStatus;

const TAB_LABELS: Record<Tab, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

export function InviteManagement({
  invites,
  accepted,
  rejected,

  onAccept,
  onReject,
  onPersonPress,
}: InviteManagementProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>('pending');

  const data = useMemo(() => {
    switch (activeTab) {
      case 'accepted':
        return accepted;

      case 'rejected':
        return rejected;

      default:
        return invites;
    }
  }, [
    activeTab,
    accepted,
    rejected,
    invites,
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Invites
        </Text>

        {invites.length > 0 ? (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>
              {invites.length} NEW
            </Text>
          </View>
        ) : null}
      </View>

      {/* Tabs */}

      <View style={styles.tabs}>
        {(
          Object.keys(TAB_LABELS) as Tab[]
        ).map((tab) => {
          const count =
            tab === 'pending'
              ? invites.length
              : tab === 'accepted'
                ? accepted.length
                : rejected.length;

          const active =
            activeTab === tab;

          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tab}
              hitSlop={6}
            >
              <View style={styles.tabContent}>
                <Text
                  style={[
                    styles.tabText,
                    active &&
                      styles.tabTextActive,
                  ]}
                >
                  {TAB_LABELS[tab]}
                </Text>

                <Text
                  style={[
                    styles.tabCount,
                    active &&
                      styles.tabTextActive,
                  ]}
                >
                  {count}
                </Text>
              </View>

              {active ? (
                <View style={styles.activeLine} />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {/* People */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
      >
        {data.length === 0 ? (
          <EmptyState status={activeTab} />
        ) : (
          data.map((person) => (
            <InviteRow
              key={person.id}
              person={person}
              status={activeTab}
              onAccept={onAccept}
              onReject={onReject}
              onPress={onPersonPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

type InviteRowProps = {
  person: InvitePerson;

  status: InviteStatus;

  onAccept?: (
    person: InvitePerson,
  ) => void;

  onReject?: (
    person: InvitePerson,
  ) => void;

  onPress?: (
    person: InvitePerson,
  ) => void;
};

function InviteRow({
  person,
  status,

  onAccept,
  onReject,
  onPress,
}: InviteRowProps) {
  const row = (
    <View style={styles.row}>
      <Avatar
        uri={person.avatarUri}
        name={person.name}
        size="medium"
        presence={
          status === 'accepted'
            ? 'going'
            : undefined
        }
        invited={status === 'pending'}
      />

      <View style={styles.personInfo}>
        <Text
          style={styles.personName}
          numberOfLines={1}
        >
          {person.name}
        </Text>

        <Text style={styles.personStatus}>
          {status === 'pending'
            ? 'Wants to join'
            : status === 'accepted'
              ? 'Accepted'
              : 'Rejected'}
          {person.time
            ? ` · ${person.time}`
            : ''}
        </Text>
      </View>

      {status === 'pending' ? (
        <View style={styles.actions}>
          <Pressable
            onPress={() => onAccept?.(person)}
            style={[
              styles.action,
              styles.accept,
            ]}
            hitSlop={6}
          >
            <Text style={styles.acceptText}>
              ✓
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onReject?.(person)}
            style={[
              styles.action,
              styles.reject,
            ]}
            hitSlop={6}
          >
            <Text style={styles.rejectText}>
              ×
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.chevron}>
          ›
        </Text>
      )}
    </View>
  );

  if (!onPress) {
    return row;
  }

  return (
    <Pressable
      onPress={() => onPress(person)}
      style={({ pressed }) => [
        pressed && styles.rowPressed,
      ]}
    >
      {row}
    </Pressable>
  );
}

function EmptyState({
  status,
}: {
  status: InviteStatus;
}) {
  const messages = {
    pending: 'No pending invites',
    accepted: 'No accepted invites',
    rejected: 'No rejected invites',
  };

  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        {messages[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#0B0A0D',
  },

  header: {
    minHeight: 64,

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 28,
    lineHeight: 32,

    fontWeight: '800',

    letterSpacing: -0.7,

    color: '#F5F5F5',
  },

  newBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: '#E41BCD',
  },

  newBadgeText: {
    fontSize: 9,
    fontWeight: '900',

    letterSpacing: 0.7,

    color: '#FFFFFF',
  },

  tabs: {
    height: 48,

    paddingHorizontal: 12,

    flexDirection: 'row',

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#24212A',
  },

  tab: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 5,
  },

  tabText: {
    fontSize: 12,
    fontWeight: '700',

    color: '#6F6D74',
  },

  tabCount: {
    fontSize: 11,
    fontWeight: '600',

    color: '#6F6D74',
  },

  tabTextActive: {
    color: '#F5F5F5',
  },

  activeLine: {
    position: 'absolute',

    left: 16,
    right: 16,
    bottom: -1,

    height: 2,

    borderRadius: 2,

    backgroundColor: '#E41BCD',
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 32,
  },

  row: {
    minHeight: 72,

    paddingHorizontal: 8,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth:
      StyleSheet.hairlineWidth,

    borderBottomColor: '#24212A',
  },

  rowPressed: {
    opacity: 0.65,
  },

  personInfo: {
    flex: 1,

    marginLeft: 13,

    minWidth: 0,
  },

  personName: {
    fontSize: 15,
    fontWeight: '700',

    color: '#F5F5F5',
  },

  personStatus: {
    marginTop: 3,

    fontSize: 12,

    color: '#A7A5AA',
  },

  actions: {
    flexDirection: 'row',

    gap: 8,

    marginLeft: 10,
  },

  action: {
    width: 38,
    height: 38,

    borderRadius: 19,

    alignItems: 'center',
    justifyContent: 'center',
  },

  accept: {
    borderWidth: 1.5,
    borderColor: '#1BE497',
  },

  reject: {
    borderWidth: 1.5,
    borderColor: '#E41BCD',
  },

  acceptText: {
    fontSize: 18,
    fontWeight: '800',

    color: '#1BE497',
  },

  rejectText: {
    fontSize: 23,
    fontWeight: '400',

    color: '#E41BCD',
  },

  chevron: {
    marginLeft: 12,

    fontSize: 28,
    fontWeight: '300',

    color: '#6F6D74',
  },

  empty: {
    paddingVertical: 80,

    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,

    color: '#6F6D74',
  },
});