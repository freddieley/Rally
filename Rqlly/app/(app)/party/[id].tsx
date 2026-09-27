import React from 'react';
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
  RqllyText,
  colors,
  radius,
  spacing,
} from '../../../components/ui';

import { Avatar, AvatarStack } from '../../../components/people';

export default function PartyPage() {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const title =
    id === 'rooftop'
      ? 'Rooftop Session'
      : id === 'late-night'
        ? 'Late Night'
        : 'House Party';

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
          <View style={styles.topBar}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.back}
            >
              <RqllyText
                variant="heading"
                color="primary"
              >
                ←
              </RqllyText>
            </Pressable>

            <RqllyText
              variant="caption"
              color="tertiary"
            >
              PARTY
            </RqllyText>

            <Pressable hitSlop={12}>
              <RqllyText
                variant="heading"
                color="primary"
              >
                ···
              </RqllyText>
            </Pressable>
          </View>

          <View style={styles.hero}>
            <RqllyText
              variant="caption"
              color="connection"
            >
              HAPPENING SOON
            </RqllyText>

            <RqllyText
              variant="display"
              style={styles.title}
            >
              {title}
            </RqllyText>

            <RqllyText
              variant="body"
              color="secondary"
            >
              Hosted by Freddie
            </RqllyText>
          </View>

          <View style={styles.mediaPlaceholder}>
            <RqllyText
              variant="caption"
              color="tertiary"
              align="center"
            >
              PARTY MEDIA
            </RqllyText>
          </View>

          <View style={styles.details}>
            <Detail
              label="WHEN"
              value="Friday 27 Sept · 10:30 PM"
            />

            <Detail
              label="WHERE"
              value="Southampton"
            />

            <Detail
              label="ACCESS"
              value="Friends + invited"
            />

            <Detail
              label="CAPACITY"
              value="23 / 50 going"
            />
          </View>

          <View style={styles.peopleSection}>
            <RqllyText variant="heading">
              People going
            </RqllyText>

            <View style={styles.people}>
              <AvatarStack
                people={[
                  {
                    id: '1',
                    name: 'Freddie',
                    presence: 'going',
                  },
                  {
                    id: '2',
                    name: 'Alex',
                    presence: 'going',
                  },
                  {
                    id: '3',
                    name: 'Charlie',
                    presence: 'going',
                  },
                  {
                    id: '4',
                    name: 'Jordan',
                    presence: 'going',
                  },
                ]}
                max={4}
                size="medium"
              />

              <RqllyText
                variant="small"
                color="secondary"
              >
                23 people are going
              </RqllyText>
            </View>
          </View>

          <View style={styles.actions}>
            <RqllyButton
              size="large"
              fullWidth
            >
              Join party
            </RqllyButton>

            <RqllyButton
              variant="secondary"
              size="large"
              fullWidth
            >
              Message host
            </RqllyButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
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
        style={styles.detailValue}
      >
        {value}
      </RqllyText>
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
    paddingBottom: 130,
  },

  topBar: {
    height: 58,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  back: {
    width: 44,
    height: 44,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  hero: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,

    fontSize: 38,
    lineHeight: 42,
  },

  mediaPlaceholder: {
    height: 260,

    borderRadius: radius.xl,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  details: {
    marginTop: spacing.xxl,

    gap: spacing.lg,

    paddingBottom: spacing.xxl,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  detail: {
    gap: spacing.xs,
  },

  detailValue: {
    color: colors.textPrimary,
  },

  peopleSection: {
    paddingTop: spacing.xxl,
  },

  people: {
    marginTop: spacing.md,

    flexDirection: 'row',
    alignItems: 'center',

    gap: spacing.md,
  },

  actions: {
    marginTop: spacing.xxxl,

    gap: spacing.sm,
  },
});