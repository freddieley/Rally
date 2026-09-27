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

const COLORS = {
  canvas: '#0B0A0D',

  front: '#141318',
  page: '#1C1A21',
  interactive: '#24212A',

  white: '#F5F5F5',
  secondary: '#A7A5AA',
  tertiary: '#6F6D74',
  border: '#2B2832',

  magenta: '#E41BCD',
  cyan: '#1BCDE4',
};

const DEFAULT_HEIGHT = 250;

const RADIUS = 30;
const DIAGONAL = 52;

function createPartyPath(
  width: number,
  height: number,
): string {
  return [
    `M ${RADIUS} 0`,
    `H ${width - RADIUS}`,
    `Q ${width} 0 ${width} ${RADIUS}`,
    `V ${height - DIAGONAL}`,
    `L ${width - DIAGONAL} ${height}`,
    `H ${RADIUS}`,
    `Q 0 ${height} 0 ${height - RADIUS}`,
    `V ${RADIUS}`,
    `Q 0 0 ${RADIUS} 0`,
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

  const [open, setOpen] =
    useState(false);

  const [pressed, setPressed] =
    useState(false);

  const progress =
    useRef(
      new Animated.Value(0),
    ).current;

  const press =
    useRef(
      new Animated.Value(0),
    ).current;

  const animatePress = (
    value: number,
  ) => {
    Animated.timing(press, {
      toValue: value,
      duration:
        value === 1 ? 70 : 110,
      easing: Easing.out(
        Easing.quad,
      ),
      useNativeDriver: true,
    }).start();
  };

  const toggleOpen = () => {
    animatePress(0);

    if (open) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 260,
        easing: Easing.inOut(
          Easing.cubic,
        ),
        useNativeDriver: true,
      }).start(() => {
        setOpen(false);
      });

      return;
    }

    setOpen(true);

    Animated.timing(progress, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(
        Easing.cubic,
      ),
      useNativeDriver: true,
    }).start();
  };

  /*
   * The card itself is the interaction.
   *
   * IMPORTANT:
   * Tapping the card does NOT navigate.
   *
   * Navigation only happens through
   * the explicit "VIEW PARTY" action.
   */

  const frontTranslateX =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -34],
    });

  const frontTranslateY =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -24],
    });

  const frontScale =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.97],
    });

  const frontOpacity =
    progress.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [1, 0.7, 0],
    });

  const pageScale =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.97, 1],
    });

  const pageTranslateY =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    });

  const pageOpacity =
    progress.interpolate({
      inputRange: [0, 0.2, 0.7, 1],
      outputRange: [0, 0.4, 0.85, 1],
    });

  const registerTranslateY =
    progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [14, 6, 0],
    });

  const registerOpacity =
    progress.interpolate({
      inputRange: [0, 0.5, 0.75, 1],
      outputRange: [0, 0, 0.7, 1],
    });

  const path =
    createPartyPath(
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
          EXPANDED CARD
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
                translateY:
                  pageTranslateY,
              },
              {
                scale: pageScale,
              },
            ],
          },
        ]}
      >
        <View
          style={styles.expandedContent}
        >
          <View>
            <View
              style={styles.eyebrow}
            >
              <View
                style={styles.liveDot}
              />

              <Text
                style={
                  styles.eyebrowText
                }
              >
                PARTY
              </Text>
            </View>

            <Text
              style={
                styles.expandedTitle
              }
              numberOfLines={2}
            >
              {title}
            </Text>

            {host ? (
              <Text
                style={
                  styles.expandedHost
                }
              >
                Hosted by {host}
              </Text>
            ) : null}
          </View>

          <View
            style={styles.expandedMiddle}
          >
            <View
              style={styles.infoRow}
            >
              {location ? (
                <View
                  style={styles.infoBlock}
                >
                  <Text
                    style={
                      styles.infoLabel
                    }
                  >
                    WHERE
                  </Text>

                  <Text
                    style={
                      styles.infoValue
                    }
                  >
                    {location}
                  </Text>
                </View>
              ) : null}

              {date || time ? (
                <View
                  style={styles.infoBlock}
                >
                  <Text
                    style={
                      styles.infoLabel
                    }
                  >
                    WHEN
                  </Text>

                  <Text
                    style={
                      styles.infoValue
                    }
                  >
                    {[date, time]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>
                </View>
              ) : null}
            </View>

            <View
              style={styles.peopleRow}
            >
              <AvatarStack
                people={attendees}
                max={5}
                size="small"
              />

              <View
                style={
                  styles.peopleInfo
                }
              >
                <Text
                  style={
                    styles.peopleCount
                  }
                >
                  {going > 0
                    ? `${going} going`
                    : 'People going'}
                </Text>

                {capacity !==
                undefined ? (
                  <Text
                    style={
                      styles.peopleSecondary
                    }
                  >
                    {spotsLeft === 0
                      ? 'Full'
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

          <View
            style={styles.expandedActions}
          >
            <Animated.View
              style={{
                opacity:
                  registerOpacity,
                transform: [
                  {
                    translateY:
                      registerTranslateY,
                  },
                ],
              }}
            >
              <Pressable
                onPress={onRegister}
                hitSlop={10}
                style={({ pressed }) => [
                  styles.joinButton,
                  pressed &&
                    styles.joinButtonPressed,
                ]}
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
              </Pressable>
            </Animated.View>

            <Pressable
              onPress={onOpen}
              style={({ pressed }) => [
                styles.viewButton,
                pressed &&
                  styles.viewButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`View ${title}`}
            >
              <Text
                style={
                  styles.viewButtonText
                }
              >
                VIEW PARTY
              </Text>

              <Text
                style={
                  styles.viewArrow
                }
              >
                →
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>

      {/* ======================================================
          CLOSED CARD
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
            opacity:
              frontOpacity,
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
          onPress={toggleOpen}
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
            style={
              StyleSheet.absoluteFill
            }
          >
            <Path
              d={path}
              fill={COLORS.front}
            />
          </Svg>

          <View
            style={[
              styles.frontContent,
              pressed &&
                styles.frontContentPressed,
            ]}
          >
            <View>
              <Text
                style={
                  styles.frontEyebrow
                }
              >
                {host
                  ? `HOSTED BY ${host.toUpperCase()}`
                  : 'PARTY'}
              </Text>

              <Text
                style={
                  styles.frontTitle
                }
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>

            <View>
              {location ? (
                <Text
                  style={
                    styles.frontLocation
                  }
                >
                  {location}
                </Text>
              ) : null}

              {date || time ? (
                <Text
                  style={
                    styles.frontDate
                  }
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

  expandedCard: {
    position: 'absolute',
    left: 0,
    top: 0,

    borderRadius: RADIUS,

    backgroundColor:
      COLORS.page,

    overflow: 'hidden',
  },

  expandedContent: {
    flex: 1,

    padding: 24,

    justifyContent:
      'space-between',
  },

  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,

    marginBottom: 10,
  },

  liveDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor:
      COLORS.cyan,
  },

  eyebrowText: {
    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.4,

    color: COLORS.cyan,
  },

  expandedTitle: {
    fontSize: 27,
    lineHeight: 31,

    fontWeight: '800',

    letterSpacing: -0.7,

    color: COLORS.white,
  },

  expandedHost: {
    marginTop: 5,

    fontSize: 12,

    color: COLORS.secondary,
  },

  expandedMiddle: {
    gap: 16,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 28,
  },

  infoBlock: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 9,
    fontWeight: '800',

    letterSpacing: 1.1,

    color: COLORS.tertiary,
  },

  infoValue: {
    marginTop: 4,

    fontSize: 12,
    fontWeight: '600',

    color: COLORS.white,
  },

  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  peopleInfo: {
    marginLeft: 12,
  },

  peopleCount: {
    fontSize: 13,
    fontWeight: '700',

    color: COLORS.white,
  },

  peopleSecondary: {
    marginTop: 2,

    fontSize: 11,

    color: COLORS.secondary,
  },

  accessPill: {
    alignSelf: 'flex-start',

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor:
      COLORS.interactive,
  },

  accessText: {
    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 0.4,

    color: COLORS.secondary,
  },

  expandedActions: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
  },

  joinButton: {
    minWidth: 78,
    height: 42,

    paddingHorizontal: 17,

    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      COLORS.magenta,
  },

  joinButtonPressed: {
    transform: [
      {
        scale: 0.95,
      },
    ],
  },

  joinText: {
    fontSize: 11,
    fontWeight: '800',

    letterSpacing: 0.9,

    color: '#FFFFFF',
  },

  viewButton: {
    flex: 1,

    height: 42,

    paddingHorizontal: 14,

    borderRadius: 21,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      COLORS.interactive,
  },

  viewButtonPressed: {
    opacity: 0.7,
  },

  viewButtonText: {
    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 0.8,

    color: COLORS.white,
  },

  viewArrow: {
    marginLeft: 7,

    fontSize: 16,
    fontWeight: '600',

    color: COLORS.cyan,
  },

  frontLayer: {
    position: 'absolute',

    left: 0,
    top: 0,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
  },

  frontPressArea: {
    flex: 1,
  },

  frontContent: {
    flex: 1,

    justifyContent:
      'space-between',

    padding: 28,
  },

  frontContentPressed: {
    transform: [
      {
        translateY: 1,
      },
    ],
  },

  frontEyebrow: {
    marginBottom: 8,

    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.4,

    color: COLORS.tertiary,
  },

  frontTitle: {
    maxWidth: '82%',

    fontSize: 30,
    lineHeight: 33,

    fontWeight: '800',

    letterSpacing: -0.8,

    color: COLORS.white,
  },

  frontLocation: {
    fontSize: 14,
    fontWeight: '600',

    color: COLORS.secondary,
  },

  frontDate: {
    marginTop: 6,

    fontSize: 12,

    color: COLORS.tertiary,
  },
});