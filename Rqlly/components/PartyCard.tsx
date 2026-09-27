import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AvatarStack } from './people/AvatarStack';
import {
  colors,
  radius,
  spacing,
} from './ui/tokens';

export type PartyCardPerson = {
  id: string;
  name: string;
  uri?: string;
  presence?: 'online' | 'going' | 'busy' | 'offline';
};

export type PartyCardProps = {
  title: string;
  host?: string;
  location?: string;
  date?: string;
  time?: string;

  attendees?: PartyCardPerson[];
  going?: number;
  capacity?: number;
  access?: string;

  width?: number;
  height?: number;

  registered?: boolean;

  onOpen?: () => void;
  onRegister?: () => void;
};

const DEFAULT_HEIGHT = 224;

const CARD_RADIUS = 28;
const DIAGONAL = 44;

function createPartyPath(
  width: number,
  height: number,
): string {
  return [
    `M ${CARD_RADIUS} 0`,
    `H ${width - CARD_RADIUS}`,
    `Q ${width} 0 ${width} ${CARD_RADIUS}`,
    `V ${height - DIAGONAL}`,
    `L ${width - DIAGONAL} ${height}`,
    `H ${CARD_RADIUS}`,
    `Q 0 ${height} 0 ${height - CARD_RADIUS}`,
    `V ${CARD_RADIUS}`,
    `Q 0 0 ${CARD_RADIUS} 0`,
    `Z`,
  ].join(' ');
}

export function PartyCard({
  title,
  host,
  location,
  date,
  time,

  attendees = [],
  going = 0,
  capacity,
  access,

  width,
  height = DEFAULT_HEIGHT,

  registered = false,

  onOpen,
  onRegister,
}: PartyCardProps) {
  const { width: screenWidth } =
    useWindowDimensions();

  const cardWidth =
    width ?? screenWidth - 32;

  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  const progress = useRef(
    new Animated.Value(0),
  ).current;

  const press = useRef(
    new Animated.Value(0),
  ).current;

  const spotsLeft =
    capacity !== undefined
      ? Math.max(capacity - going, 0)
      : undefined;

  const animatePress = (value: number) => {
    Animated.timing(press, {
      toValue: value,
      duration: value === 1 ? 70 : 110,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const openParty = () => {
    if (open) {
      return;
    }

    setOpen(true);

    Animated.timing(progress, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeParty = () => {
    if (!open) {
      return;
    }

    Animated.timing(progress, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setOpen(false);
      }
    });
  };

  const toggleParty = () => {
    animatePress(0);

    if (open) {
      closeParty();
    } else {
      openParty();
    }
  };

  /*
   * FRONT
   *
   * The original Rally interaction is preserved:
   * the front surface physically moves away rather
   * than simply disappearing.
   */

  const frontTranslateX =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -34],
    });

  const frontTranslateY =
    Animated.add(
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -25],
      }),
      press.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2],
      }),
    );

  const frontScale =
    progress.interpolate({
      inputRange: [0, 0.55, 1],
      outputRange: [1, 0.99, 0.975],
    });

  const frontOpacity =
    progress.interpolate({
      inputRange: [0, 0.65, 1],
      outputRange: [1, 0.72, 0],
    });

  const frontShadow =
    progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.16, 0],
    });

  /*
   * BACK / DETAILS
   */

  const detailsOpacity =
    progress.interpolate({
      inputRange: [0, 0.15, 0.52, 1],
      outputRange: [0, 0.22, 0.8, 1],
    });

  const detailsTranslateY =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    });

  const detailsScale =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.975, 1],
    });

  const actionOpacity =
    progress.interpolate({
      inputRange: [0, 0.5, 0.78, 1],
      outputRange: [0, 0, 0.65, 1],
    });

  const actionTranslateY =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 0],
    });

  const path = createPartyPath(
    cardWidth,
    height,
  );

  return (
    <View
      style={[
        styles.container,
        {
          width: cardWidth,
          height,
        },
      ]}
    >
      {/* ======================================================
          DETAILS SURFACE
          ====================================================== */}

      <Animated.View
        pointerEvents={
          open ? 'auto' : 'none'
        }
        style={[
          styles.detailsCard,
          {
            width: cardWidth,
            height,

            opacity: detailsOpacity,

            transform: [
              {
                translateY: detailsTranslateY,
              },
              {
                scale: detailsScale,
              },
            ],
          },
        ]}
      >
        <View style={styles.detailsContent}>
          {/* TOP */}

          <View>
            <View style={styles.detailsTopRow}>
              <View style={styles.partyType}>
                <View style={styles.partyDot} />

                <Text style={styles.partyTypeText}>
                  PARTY
                </Text>
              </View>

              <Pressable
                onPress={onOpen}
                hitSlop={10}
                style={({ pressed }) => [
                  styles.viewButton,
                  pressed &&
                    styles.viewButtonPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`View ${title}`}
              >
                <Text style={styles.viewText}>
                  VIEW PARTY
                </Text>

                <Text style={styles.viewArrow}>
                  →
                </Text>
              </Pressable>
            </View>

            <Text
              style={styles.detailsTitle}
              numberOfLines={2}
            >
              {title}
            </Text>

            {host ? (
              <Text style={styles.detailsHost}>
                Hosted by {host}
              </Text>
            ) : null}
          </View>

          {/* INFORMATION */}

          <View style={styles.detailsInfo}>
            <View style={styles.detailsColumns}>
              {location ? (
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    WHERE
                  </Text>

                  <Text
                    style={styles.detailValue}
                    numberOfLines={1}
                  >
                    {location}
                  </Text>
                </View>
              ) : null}

              {date || time ? (
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>
                    WHEN
                  </Text>

                  <Text
                    style={styles.detailValue}
                    numberOfLines={1}
                  >
                    {[date, time]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.peopleRow}>
              <AvatarStack
                people={attendees}
                max={5}
                size="small"
              />

              <View style={styles.peopleCopy}>
                <Text style={styles.peoplePrimary}>
                  {going === 0
                    ? 'Be the first to join'
                    : `${going} going`}
                </Text>

                {capacity !== undefined ? (
                  <Text style={styles.peopleSecondary}>
                    {spotsLeft === 0
                      ? 'Party is full'
                      : `${spotsLeft} spots left`}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        {/* JOIN */}

        <Animated.View
          style={[
            styles.joinPosition,
            {
              opacity: actionOpacity,
              transform: [
                {
                  translateY:
                    actionTranslateY,
                },
              ],
            },
          ]}
        >
          <Pressable
            onPress={onRegister}
            hitSlop={10}
            style={({ pressed }) => [
              styles.joinButton,
              pressed &&
                styles.joinButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={
              registered
                ? `Joined ${title}`
                : `Join ${title}`
            }
          >
            <Text style={styles.joinText}>
              {registered ? 'JOINED' : 'JOIN'}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {/* ======================================================
          FRONT SURFACE
          ====================================================== */}

      <Animated.View
        pointerEvents={
          open ? 'none' : 'auto'
        }
        style={[
          styles.frontLayer,
          {
            width: cardWidth,
            height,

            opacity: frontOpacity,

            shadowOpacity:
              frontShadow,

            transform: [
              {
                translateX:
                  frontTranslateX,
              },
              {
                translateY:
                  frontTranslateY,
              },
              {
                scale: frontScale,
              },
            ],
          },
        ]}
      >
        <View style={styles.frontPressArea}>
          <Svg
            width={cardWidth}
            height={height}
            viewBox={`0 0 ${cardWidth} ${height}`}
            style={
              StyleSheet.absoluteFill
            }
          >
            <Path
              d={path}
              fill={colors.surface}
            />
          </Svg>

          <View
            style={[
              styles.frontContent,
              pressed &&
                styles.frontContentPressed,
            ]}
          >
            {/* HEADER */}

            <View>
              <View style={styles.frontPartyRow}>
                <View style={styles.partyType}>
                  <View style={styles.partyDot} />

                  <Text
                    style={
                      styles.frontPartyText
                    }
                  >
                    PARTY
                  </Text>
                </View>

                <Text
                  style={
                    styles.tapHint
                  }
                >
                  DETAILS →
                </Text>
              </View>

              <Text
                style={styles.frontTitle}
                numberOfLines={2}
              >
                {title}
              </Text>

              {host ? (
                <Text style={styles.frontHost}>
                  Hosted by {host}
                </Text>
              ) : null}
            </View>

            {/* BOTTOM */}

            <View>
              <View style={styles.frontMetaRow}>
                {location ? (
                  <View style={styles.frontMetaBlock}>
                    <Text
                      style={styles.metaLabel}
                    >
                      WHERE
                    </Text>

                    <Text
                      style={styles.metaValue}
                      numberOfLines={1}
                    >
                      {location}
                    </Text>
                  </View>
                ) : null}

                {date || time ? (
                  <View style={styles.frontMetaBlock}>
                    <Text
                      style={styles.metaLabel}
                    >
                      WHEN
                    </Text>

                    <Text
                      style={styles.metaValue}
                      numberOfLines={1}
                    >
                      {[date, time]
                        .filter(Boolean)
                        .join(' · ')}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.frontPeopleRow}>
                <AvatarStack
                  people={attendees}
                  max={5}
                  size="small"
                />

                <Text
                  style={
                    styles.frontPeopleText
                  }
                >
                  {going === 0
                    ? 'Be the first'
                    : `${going} going`}
                </Text>

                {access ? (
                  <View
                    style={
                      styles.accessPill
                    }
                  >
                    <Text
                      style={
                        styles.accessText
                      }
                    >
                      {access}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        {/* Overlay so the whole card is tappable without nesting a <button> inside the join button */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={toggleParty}
          onPressIn={() => {
            setPressed(true);
            animatePress(1);
          }}
          onPressOut={() => {
            setPressed(false);
            animatePress(0);
          }}
          accessibilityRole="button"
          accessibilityLabel={`${title} party`}
          accessibilityHint="Tap to see more details"
        />

        {/* QUICK JOIN */}

        <Pressable
          onPress={(event) => {
            event.stopPropagation?.();
            onRegister?.();
          }}
          hitSlop={8}
          style={({ pressed }) => [
            styles.frontJoinButton,
            pressed &&
              styles.frontJoinPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            registered
              ? `Joined ${title}`
              : `Quick join ${title}`
          }
        >
          <Text style={styles.frontJoinText}>
            {registered ? 'JOINED' : 'JOIN'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },

  /*
   * DETAILS
   */

  detailsCard: {
    position: 'absolute',

    left: 0,
    top: 0,

    borderRadius: CARD_RADIUS,

    backgroundColor:
      colors.surfaceElevated,

    overflow: 'hidden',
  },

  detailsContent: {
    flex: 1,

    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: 62,

    justifyContent:
      'space-between',
  },

  detailsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  partyType: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 7,
  },

  partyDot: {
    width: 7,
    height: 7,

    borderRadius: radius.pill,

    backgroundColor:
      colors.connection,
  },

  partyTypeText: {
    fontSize: 10,
    lineHeight: 13,

    fontWeight: '800',

    letterSpacing: 1.4,

    color: colors.connection,
  },

  viewButton: {
    height: 30,

    paddingHorizontal: 11,

    borderRadius: radius.pill,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor:
      colors.surfaceInteractive,
  },

  viewButtonPressed: {
    opacity: 0.65,

    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  viewText: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '800',

    letterSpacing: 0.7,

    color: colors.textPrimary,
  },

  viewArrow: {
    marginLeft: 5,

    fontSize: 14,
    lineHeight: 14,

    color: colors.connection,
  },

  detailsTitle: {
    marginTop: spacing.md,

    maxWidth: '82%',

    fontSize: 27,
    lineHeight: 31,

    fontWeight: '800',

    letterSpacing: -0.8,

    color: colors.textPrimary,
  },

  detailsHost: {
    marginTop: 4,

    fontSize: 12,
    lineHeight: 16,

    color: colors.textSecondary,
  },

  detailsInfo: {
    gap: spacing.md,
  },

  detailsColumns: {
    flexDirection: 'row',

    gap: spacing.xl,
  },

  detailColumn: {
    flex: 1,

    minWidth: 0,
  },

  detailLabel: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '800',

    letterSpacing: 1.1,

    color: colors.textTertiary,
  },

  detailValue: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: '600',

    color: colors.textPrimary,
  },

  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  peopleCopy: {
    flex: 1,

    marginLeft: spacing.md,
  },

  peoplePrimary: {
    fontSize: 13,
    lineHeight: 17,

    fontWeight: '700',

    color: colors.textPrimary,
  },

  peopleSecondary: {
    marginTop: 2,

    fontSize: 11,
    lineHeight: 14,

    color: colors.textSecondary,
  },

  joinPosition: {
    position: 'absolute',

    right: 18,
    bottom: 15,
  },

  joinButton: {
    minWidth: 80,
    height: 42,

    paddingHorizontal: 17,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.brand,

    shadowColor: colors.brand,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 12,
    shadowOpacity: 0.2,

    elevation: 4,
  },

  joinButtonPressed: {
    transform: [
      {
        scale: 0.95,
      },
    ],

    backgroundColor:
      colors.brandPressed,
  },

  joinText: {
    fontSize: 11,
    lineHeight: 14,

    fontWeight: '800',

    letterSpacing: 0.8,

    color: colors.white,
  },

  /*
   * FRONT
   */

  frontLayer: {
    position: 'absolute',

    left: 0,
    top: 0,

    shadowColor: colors.black,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowRadius: 20,

    elevation: 10,
  },

  frontPressArea: {
    flex: 1,
  },

  frontContent: {
    flex: 1,

    justifyContent:
      'space-between',

    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },

  frontContentPressed: {
    transform: [
      {
        translateY: 1,
      },
    ],
  },

  frontPartyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  frontPartyText: {
    fontSize: 10,
    lineHeight: 13,

    fontWeight: '800',

    letterSpacing: 1.4,

    color: colors.connection,
  },

  tapHint: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '700',

    letterSpacing: 0.7,

    color: colors.textTertiary,
  },

  frontTitle: {
    marginTop: spacing.sm,

    maxWidth: '80%',

    fontSize: 29,
    lineHeight: 32,

    fontWeight: '800',

    letterSpacing: -0.9,

    color: colors.textPrimary,
  },

  frontHost: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    color: colors.textSecondary,
  },

  frontMetaRow: {
    flexDirection: 'row',

    gap: spacing.xl,
  },

  frontMetaBlock: {
    flex: 1,

    minWidth: 0,
  },

  metaLabel: {
    fontSize: 8,
    lineHeight: 11,

    fontWeight: '800',

    letterSpacing: 1.1,

    color: colors.textTertiary,
  },

  metaValue: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: '600',

    color: colors.textPrimary,
  },

  frontPeopleRow: {
    marginTop: spacing.md,

    paddingRight: 76,

    flexDirection: 'row',
    alignItems: 'center',
  },

  frontPeopleText: {
    marginLeft: spacing.md,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: '700',

    color: colors.textPrimary,
  },

  accessPill: {
    marginLeft: 'auto',

    minHeight: 26,

    paddingHorizontal: 9,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.surfaceInteractive,
  },

  accessText: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '700',

    color: colors.textSecondary,
  },

  frontJoinButton: {
    position: 'absolute',

    right: 16,
    bottom: 15,

    minWidth: 76,
    height: 42,

    paddingHorizontal: 16,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.brand,

    shadowColor: colors.brand,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 12,
    shadowOpacity: 0.22,

    elevation: 4,
  },

  frontJoinPressed: {
    transform: [
      {
        scale: 0.95,
      },
    ],

    backgroundColor:
      colors.brandPressed,
  },

  frontJoinText: {
    fontSize: 11,
    lineHeight: 14,

    fontWeight: '800',

    letterSpacing: 0.8,

    color: colors.white,
  },
});