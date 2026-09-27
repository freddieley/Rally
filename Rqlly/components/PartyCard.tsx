import React, {
  useRef,
} from 'react';

import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

import Svg, {
  Circle,
  Path,
} from 'react-native-svg';

import { AvatarStack } from './people/AvatarStack';

import {
  colors,
  radius,
  spacing,
} from './ui/tokens';

import {
  motion,
} from './motion/motion';

import {
  RqllyPressable,
} from './motion/RqllyPressable';

export type PartyCardPerson = {
  id: string;
  name: string;
  uri?: string;
  presence?:
    | 'online'
    | 'going'
    | 'busy'
    | 'offline';
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
  const {
    width: screenWidth,
  } = useWindowDimensions();

  const cardWidth =
    width ??
    screenWidth - 32;

  const hover = useRef(
    new Animated.Value(0),
  ).current;

  const press = useRef(
    new Animated.Value(0),
  ).current;

  const animateHover = (
    value: number,
  ) => {
    Animated.spring(hover, {
      toValue: value,
      ...motion.spring.hover,
      useNativeDriver: true,
    }).start();
  };

  const animatePress = (
    value: number,
  ) => {
    Animated.spring(press, {
      toValue: value,
      ...motion.spring.press,
      useNativeDriver: true,
    }).start();
  };

  const hoverScale =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.012],
    });

  const pressScale =
    press.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.985],
    });

  const hoverTranslateY =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -4],
    });

  const pressTranslateY =
    press.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  const shadowOpacity =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [0.24, 0.38],
    });

  const accentOpacity =
    hover.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.16],
    });

  const path = createPartyPath(
    cardWidth,
    height,
  );

  const spotsLeft =
    capacity !== undefined
      ? Math.max(
          capacity - going,
          0,
        )
      : undefined;

  return (
    <RqllyPressable
      onPress={onOpen}
      hoverScale={1}
      pressedScale={1}
      // Card wraps a nested JOIN button, so it can't be a real <button> on web (no nested buttons).
      accessibilityRole="none"
      accessibilityLabel={`${title} party`}
      accessibilityHint="Open party details"
      style={{
        width: cardWidth,
      }}
    >
      <Animated.View
        style={[
          styles.card,

          {
            width: cardWidth,
            height,

            shadowOpacity,

            transform: [
              {
                scale:
                  Animated.multiply(
                    hoverScale,
                    pressScale,
                  ),
              },

              {
                translateY:
                  Animated.add(
                    hoverTranslateY,
                    pressTranslateY,
                  ),
              },
            ],
          },
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.hoverAccent,
            {
              opacity: accentOpacity,
            },
          ]}
        />

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
          style={
            styles.content
          }
        >
          {/* TOP */}

          <View>
            <View
              style={
                styles.topRow
              }
            >
              <View
                style={
                  styles.partyLabel
                }
              >
                <View
                  style={
                    styles.partyDot
                  }
                />

                <Text
                  style={
                    styles.partyText
                  }
                >
                  PARTY
                </Text>
              </View>

              <Text
                style={
                  styles.detailsHint
                }
              >
                VIEW PARTY →
              </Text>
            </View>

            <Text
              style={
                styles.title
              }
              numberOfLines={2}
            >
              {title}
            </Text>

            {host ? (
              <Text
                style={
                  styles.host
                }
              >
                Hosted by {host}
              </Text>
            ) : null}
          </View>

          {/* INFORMATION */}

          <View>
            <View
              style={
                styles.metaRow
              }
            >
              {location ? (
                <View
                  style={
                    styles.metaBlock
                  }
                >
                  <Text
                    style={
                      styles.metaLabel
                    }
                  >
                    WHERE
                  </Text>

                  <Text
                    style={
                      styles.metaValue
                    }
                    numberOfLines={1}
                  >
                    {location}
                  </Text>
                </View>
              ) : null}

              {date || time ? (
                <View
                  style={
                    styles.metaBlock
                  }
                >
                  <Text
                    style={
                      styles.metaLabel
                    }
                  >
                    WHEN
                  </Text>

                  <Text
                    style={
                      styles.metaValue
                    }
                    numberOfLines={1}
                  >
                    {[date, time]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>
                </View>
              ) : null}
            </View>

            <View
              style={
                styles.bottomRow
              }
            >
              <View
                style={
                  styles.people
                }
              >
                <AvatarStack
                  people={attendees}
                  max={5}
                  size="small"
                />

                <View
                  style={
                    styles.peopleCopy
                  }
                >
                  <Text
                    style={
                      styles.going
                    }
                  >
                    {going === 0
                      ? 'Be the first to join'
                      : `${going} going`}
                  </Text>

                  {capacity !==
                  undefined ? (
                    <Text
                      style={
                        styles.remaining
                      }
                    >
                      {spotsLeft === 0
                        ? 'Party is full'
                        : `${spotsLeft} spots left`}
                    </Text>
                  ) : null}
                </View>
              </View>

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

        {/* QUICK JOIN */}

        <Animated.View
          style={[
            styles.joinWrap,
            {
              transform: [
                {
                  scale:
                    press.interpolate({
                      inputRange: [
                        0,
                        1,
                      ],
                      outputRange: [
                        1,
                        0.95,
                      ],
                    }),
                },
              ],
            },
          ]}
        >
          <AnimatedPressable
            onPress={(
              event,
            ) => {
              event.stopPropagation?.();
              onRegister?.();
            }}
            onPressIn={() =>
              animatePress(1)
            }
            onPressOut={() =>
              animatePress(0)
            }
            hitSlop={8}
            style={
              styles.joinButton
            }
            accessibilityRole="button"
            accessibilityLabel={
              registered
                ? `Joined ${title}`
                : `Quick join ${title}`
            }
          >
            <Text
              style={
                styles.joinText
              }
            >
              {registered
                ? 'JOINED'
                : 'JOIN'}
            </Text>
          </AnimatedPressable>
        </Animated.View>
      </Animated.View>
    </RqllyPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',

    alignSelf: 'center',

    overflow: 'visible',

    shadowColor:
      colors.black,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowRadius: 18,

    elevation: 9,
  },

  hoverAccent: {
    position: 'absolute',

    left: 20,
    top: 0,

    width: 90,
    height: 3,

    borderRadius:
      radius.pill,

    backgroundColor:
      colors.connection,

    zIndex: 5,
  },

  content: {
    flex: 1,

    justifyContent:
      'space-between',

    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },

  topRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',
  },

  partyLabel: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 7,
  },

  partyDot: {
    width: 7,
    height: 7,

    borderRadius:
      radius.pill,

    backgroundColor:
      colors.connection,
  },

  partyText: {
    fontSize: 10,
    lineHeight: 13,

    fontWeight: '800',

    letterSpacing: 1.4,

    color:
      colors.connection,
  },

  detailsHint: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '700',

    letterSpacing: 0.5,

    color:
      colors.textTertiary,
  },

  title: {
    marginTop: spacing.sm,

    maxWidth: '82%',

    fontSize: 29,
    lineHeight: 32,

    fontWeight: '800',

    letterSpacing: -0.9,

    color:
      colors.textPrimary,
  },

  host: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    color:
      colors.textSecondary,
  },

  metaRow: {
    flexDirection: 'row',

    gap: spacing.xl,
  },

  metaBlock: {
    flex: 1,

    minWidth: 0,

    paddingRight: 4,
  },

  metaLabel: {
    fontSize: 8,
    lineHeight: 11,

    fontWeight: '800',

    letterSpacing: 1.05,

    color:
      colors.textTertiary,
  },

  metaValue: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: '600',

    color:
      colors.textPrimary,
  },

  bottomRow: {
    marginTop: spacing.md,

    paddingRight: 74,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',
  },

  people: {
    flexDirection: 'row',

    alignItems: 'center',

    minWidth: 0,
  },

  peopleCopy: {
    marginLeft: spacing.md,

    minWidth: 0,
  },

  going: {
    fontSize: 12,
    lineHeight: 16,

    fontWeight: '700',

    color:
      colors.textPrimary,
  },

  remaining: {
    marginTop: 1,

    fontSize: 10,
    lineHeight: 14,

    color:
      colors.textSecondary,
  },

  accessPill: {
    marginLeft: spacing.sm,

    minHeight: 26,

    paddingHorizontal: 9,

    borderRadius:
      radius.pill,

    alignItems: 'center',

    justifyContent:
      'center',

    backgroundColor:
      colors.surfaceInteractive,
  },

  accessText: {
    fontSize: 9,
    lineHeight: 12,

    fontWeight: '700',

    color:
      colors.textSecondary,
  },

  joinWrap: {
    position: 'absolute',

    right: 16,
    bottom: 15,

    zIndex: 10,
  },

  joinButton: {
    minWidth: 76,
    height: 42,

    paddingHorizontal: 16,

    borderRadius:
      radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      colors.brand,

    shadowColor:
      colors.brand,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowRadius: 10,

    shadowOpacity: 0.22,

    elevation: 4,
  },

  joinText: {
    fontSize: 11,
    lineHeight: 14,

    fontWeight: '800',

    letterSpacing: 0.8,

    color:
      colors.white,
  },
});