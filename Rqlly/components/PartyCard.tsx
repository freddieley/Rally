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

const DEFAULT_HEIGHT = 248;

const CARD_RADIUS = 30;
const DIAGONAL = 52;

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

  /*
   * One spatial value controls the entire
   * card transition.
   *
   * 0 = closed
   * 1 = expanded
   */
  const progress = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * Tiny tactile press animation.
   * Felt more than seen.
   */
  const press = useRef(
    new Animated.Value(0),
  ).current;

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

    progress.stopAnimation();

    Animated.timing(progress, {
      toValue: 1,
      duration: 390,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeParty = () => {
    if (!open) {
      return;
    }

    progress.stopAnimation();

    Animated.timing(progress, {
      toValue: 0,
      duration: 330,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setOpen(false);
      }
    });
  };

  const handleFrontPress = () => {
    animatePress(0);

    if (open) {
      closeParty();
      return;
    }

    openParty();
  };

  /*
   * ------------------------------------------------------------
   * FRONT SURFACE
   * ------------------------------------------------------------
   *
   * This intentionally stays visible during the transition.
   * It pulls diagonally away rather than simply fading out.
   * That is the part of the original interaction that gives
   * the card its "physical" feel.
   */

  const frontTranslateX =
    Animated.add(
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -38],
      }),
      press.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      }),
    );

  const frontTranslateY =
    Animated.add(
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -30],
      }),
      press.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2],
      }),
    );

  const frontScale =
    progress.interpolate({
      inputRange: [0, 0.55, 1],
      outputRange: [1, 0.985, 0.965],
    });

  const frontShadowOpacity =
    progress.interpolate({
      inputRange: [0, 0.45, 1],
      outputRange: [0.34, 0.2, 0],
    });

  /*
   * ------------------------------------------------------------
   * EXPANDED SURFACE
   * ------------------------------------------------------------
   */

  const pageScale =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.965, 1],
    });

  const pageTranslateY =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 0],
    });

  const pageOpacity =
    progress.interpolate({
      inputRange: [0, 0.16, 0.5, 1],
      outputRange: [0, 0.35, 0.85, 1],
    });

  const actionTranslateY =
    progress.interpolate({
      inputRange: [0, 0.45, 1],
      outputRange: [10, 4, 0],
    });

  const actionOpacity =
    progress.interpolate({
      inputRange: [0, 0.45, 0.75, 1],
      outputRange: [0, 0, 0.75, 1],
    });

  const path = createPartyPath(
    cardWidth,
    height,
  );

  const spotsLeft =
    capacity !== undefined
      ? Math.max(capacity - going, 0)
      : undefined;

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
          EXPANDED PARTY SURFACE
          ====================================================== */}

      <Animated.View
        pointerEvents={
          open ? 'auto' : 'none'
        }
        style={[
          styles.expandedCard,
          {
            width: cardWidth,
            height,

            opacity: pageOpacity,

            transform: [
              {
                translateY: pageTranslateY,
              },
              {
                scale: pageScale,
              },
            ],
          },
        ]}
      >
        <View style={styles.expandedContent}>
          {/* HEADER */}

          <View>
            <View style={styles.expandedHeader}>
              <View style={styles.eyebrow}>
                <View style={styles.liveDot} />

                <Text style={styles.eyebrowText}>
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
                accessibilityLabel={`View full ${title} party`}
              >
                <Text style={styles.viewButtonText}>
                  VIEW
                </Text>

                <Text style={styles.viewArrow}>
                  →
                </Text>
              </Pressable>
            </View>

            <Text
              style={styles.expandedTitle}
              numberOfLines={2}
            >
              {title}
            </Text>

            {host ? (
              <Text style={styles.expandedHost}>
                Hosted by {host}
              </Text>
            ) : null}
          </View>

          {/* DETAILS */}

          <View style={styles.detailsArea}>
            <View style={styles.infoRow}>
              {location ? (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>
                    WHERE
                  </Text>

                  <Text
                    style={styles.infoValue}
                    numberOfLines={1}
                  >
                    {location}
                  </Text>
                </View>
              ) : null}

              {date || time ? (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>
                    WHEN
                  </Text>

                  <Text
                    style={styles.infoValue}
                    numberOfLines={1}
                  >
                    {[date, time]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* PEOPLE */}

            <View style={styles.peopleRow}>
              <AvatarStack
                people={attendees}
                max={5}
                size="small"
              />

              <View style={styles.peopleInfo}>
                <Text style={styles.peopleCount}>
                  {going > 0
                    ? `${going} going`
                    : 'No one going yet'}
                </Text>

                {capacity !== undefined ? (
                  <Text style={styles.peopleSecondary}>
                    {spotsLeft === 0
                      ? 'Full'
                      : `${spotsLeft} spots left`}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* ACCESS */}

            {access ? (
              <View style={styles.accessPill}>
                <Text style={styles.accessText}>
                  {access}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* QUICK JOIN */}

        <Animated.View
          style={[
            styles.quickJoinPosition,
            {
              opacity: actionOpacity,
              transform: [
                {
                  translateY: actionTranslateY,
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
                : `Quick join ${title}`
            }
          >
            <Text style={styles.joinText}>
              {registered ? 'JOINED' : 'JOIN'}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {/* ======================================================
          FRONT / CLOSED CARD
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

            shadowOpacity:
              frontShadowOpacity,

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
        <Pressable
          style={styles.frontPressArea}
          onPress={handleFrontPress}
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
          accessibilityHint="Expand party details"
        >
          <Svg
            width={cardWidth}
            height={height}
            viewBox={`0 0 ${cardWidth} ${height}`}
            style={StyleSheet.absoluteFill}
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
            {/* TOP */}

            <View>
              <Text style={styles.frontEyebrow}>
                {host
                  ? `HOSTED BY ${host.toUpperCase()}`
                  : 'PARTY'}
              </Text>

              <Text
                style={styles.frontTitle}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>

            {/* BOTTOM */}

            <View style={styles.frontBottom}>
              {location ? (
                <Text
                  style={styles.frontLocation}
                  numberOfLines={1}
                >
                  {location}
                </Text>
              ) : null}

              {date || time ? (
                <Text
                  style={styles.frontDate}
                  numberOfLines={1}
                >
                  {[date, time]
                    .filter(Boolean)
                    .join('  •  ')}
                </Text>
              ) : null}
            </View>
          </View>
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
   * ==========================================================
   * EXPANDED CARD
   * ==========================================================
   */

  expandedCard: {
    position: 'absolute',

    left: 0,
    top: 0,

    borderRadius: CARD_RADIUS,

    backgroundColor:
      colors.surfaceElevated,

    overflow: 'hidden',
  },

  expandedContent: {
    flex: 1,

    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: 66,

    justifyContent:
      'space-between',
  },

  expandedHeader: {
    minHeight: 22,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: spacing.sm,
  },

  liveDot: {
    width: 7,
    height: 7,

    borderRadius: radius.pill,

    backgroundColor:
      colors.connection,
  },

  eyebrowText: {
    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.5,

    color: colors.connection,
  },

  viewButton: {
    minWidth: 62,
    height: 30,

    paddingHorizontal: 11,

    borderRadius: radius.pill,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.surfaceInteractive,
  },

  viewButtonPressed: {
    transform: [
      {
        scale: 0.95,
      },
    ],

    opacity: 0.8,
  },

  viewButtonText: {
    fontSize: 9,
    fontWeight: '800',

    letterSpacing: 0.9,

    color: colors.textPrimary,
  },

  viewArrow: {
    marginLeft: 5,

    fontSize: 14,
    lineHeight: 14,

    color: colors.connection,
  },

  expandedTitle: {
    marginTop: spacing.md,

    maxWidth: '85%',

    fontSize: 29,
    lineHeight: 32,

    fontWeight: '800',

    letterSpacing: -0.9,

    color: colors.textPrimary,
  },

  expandedHost: {
    marginTop: spacing.xs,

    fontSize: 12,

    color: colors.textSecondary,
  },

  detailsArea: {
    gap: spacing.lg,
  },

  infoRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },

  infoBlock: {
    flex: 1,
    minWidth: 0,
  },

  infoLabel: {
    fontSize: 9,
    fontWeight: '800',

    letterSpacing: 1.2,

    color: colors.textTertiary,
  },

  infoValue: {
    marginTop: 4,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: '600',

    color: colors.textPrimary,
  },

  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  peopleInfo: {
    flex: 1,

    marginLeft: spacing.md,
  },

  peopleCount: {
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

  accessPill: {
    alignSelf: 'flex-start',

    minHeight: 28,

    paddingHorizontal: 10,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.surfaceInteractive,
  },

  accessText: {
    fontSize: 10,
    lineHeight: 13,

    fontWeight: '700',

    letterSpacing: 0.3,

    color: colors.textSecondary,
  },

  /*
   * ==========================================================
   * QUICK JOIN
   * ==========================================================
   */

  quickJoinPosition: {
    position: 'absolute',

    right: 18,
    bottom: 16,
  },

  joinButton: {
    minWidth: 82,
    height: 44,

    paddingHorizontal: 19,

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

    letterSpacing: 0.9,

    color: colors.white,
  },

  /*
   * ==========================================================
   * FRONT CARD
   * ==========================================================
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

    padding: spacing.xl,
  },

  frontContentPressed: {
    transform: [
      {
        translateY: 1,
      },
    ],
  },

  frontEyebrow: {
    marginBottom: spacing.sm,

    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.4,

    color: colors.textTertiary,
  },

  frontTitle: {
    maxWidth: '84%',

    fontSize: 30,
    lineHeight: 33,

    fontWeight: '800',

    letterSpacing: -0.9,

    color: colors.textPrimary,
  },

  frontBottom: {
    paddingRight: 42,
  },

  frontLocation: {
    fontSize: 14,
    lineHeight: 18,

    fontWeight: '600',

    color: colors.textSecondary,
  },

  frontDate: {
    marginTop: 5,

    fontSize: 12,
    lineHeight: 16,

    color: colors.textTertiary,
  },
});