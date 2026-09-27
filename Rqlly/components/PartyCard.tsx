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

export type PartyCardProps = {
  title: string;
  host?: string;
  location?: string;
  date?: string;
  time?: string;

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

  white: '#F5F5F5',
  secondary: '#A7A5AA',
  tertiary: '#6F6D74',

  magenta: '#E41BCD',
  cyan: '#1BCDE4',
};

const DEFAULT_HEIGHT = 220;

const RADIUS = 30;
const DIAGONAL = 52;

function createPartyPath(
  width: number,
  height: number,
): string {
  return [
    // top-left
    `M ${RADIUS} 0`,

    // top
    `H ${width - RADIUS}`,

    // top-right
    `Q ${width} 0 ${width} ${RADIUS}`,

    // right edge
    `V ${height - DIAGONAL}`,

    // diagonal
    `L ${width - DIAGONAL} ${height}`,

    // bottom edge
    `H ${RADIUS}`,

    // bottom-left
    `Q 0 ${height} 0 ${height - RADIUS}`,

    // left edge
    `V ${RADIUS}`,

    // top-left
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

  width,
  height = DEFAULT_HEIGHT,

  registered = false,

  onOpen,
  onRegister,
}: PartyCardProps) {
  const { width: screenWidth } = useWindowDimensions();

  const cardWidth = width ?? screenWidth - 32;

  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  /*
   * One value controls the entire spatial transition.
   *
   * 0 = completely closed
   * 1 = completely open
   */
  const progress = useRef(new Animated.Value(0)).current;

  /*
   * Separate tactile press value.
   *
   * This is intentionally tiny.
   * It should be felt rather than noticed.
   */
  const press = useRef(new Animated.Value(0)).current;

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
      duration: 390,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onOpen?.();
      }
    });
  };

  const closeParty = () => {
    if (!open) {
      return;
    }

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
   * IMPORTANT:
   *
   * We are NOT scaling the card down.
   *
   * It translates diagonally toward the upper-left while
   * becoming very slightly smaller.
   *
   * The movement is deliberately asymmetric.
   */

  const frontTranslateX = Animated.add(
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -38],
    }),
    press.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    }),
  );

  const frontTranslateY = Animated.add(
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -30],
    }),
    press.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
  );

  const frontScale = progress.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [1, 0.985, 0.965],
  });

  const frontShadowOpacity = progress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [0.34, 0.20, 0],
  });

  /*
   * ------------------------------------------------------------
   * UNDERLYING PAGE
   * ------------------------------------------------------------
   *
   * It is already there.
   *
   * We don't fade in a replacement card.
   *
   * It rises forward as the front surface retracts.
   */

  const pageScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.965, 1],
  });

  const pageTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  const pageOpacity = progress.interpolate({
    inputRange: [0, 0.18, 0.5, 1],
    outputRange: [0, 0.45, 0.85, 1],
  });

  /*
   * Registration action is revealed slightly later than the
   * underlying page.
   *
   * This gives the eye somewhere to land.
   */
  const registerTranslateY = progress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [14, 8, 0],
  });

  const registerOpacity = progress.interpolate({
    inputRange: [0, 0.45, 0.7, 1],
    outputRange: [0, 0, 0.7, 1],
  });

  const path = createPartyPath(cardWidth, height);

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
          PARTY PAGE
          ====================================================== */}

      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.partyPage,
          {
            width: cardWidth,
            height,
          },
          {
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
        <View style={styles.pageContent}>
          <View style={styles.pageEyebrow}>
            <View style={styles.liveIndicator} />

            <Text style={styles.pageEyebrowText}>
              PARTY
            </Text>
          </View>

          <Text style={styles.pageTitle}>
            {title}
          </Text>

          {host ? (
            <Text style={styles.pageHost}>
              Hosted by {host}
            </Text>
          ) : null}

          {location ? (
            <Text style={styles.pageLocation}>
              {location}
            </Text>
          ) : null}

          <View style={styles.metaRow}>
            {date ? (
              <View>
                <Text style={styles.metaLabel}>
                  DATE
                </Text>

                <Text style={styles.metaValue}>
                  {date}
                </Text>
              </View>
            ) : null}

            {time ? (
              <View>
                <Text style={styles.metaLabel}>
                  TIME
                </Text>

                <Text style={styles.metaValue}>
                  {time}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Registration is physically part of the page underneath. */}
        <Animated.View
          style={[
            styles.registerPosition,
            {
              opacity: registerOpacity,
              transform: [
                {
                  translateY: registerTranslateY,
                },
              ],
            },
          ]}
        >
          <Pressable
            onPress={(event) => {
              event.stopPropagation?.();
              onRegister?.();
            }}
            hitSlop={10}
            style={({ pressed: buttonPressed }) => [
              styles.registerButton,
              buttonPressed && styles.registerButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={
              registered
                ? `Leave ${title}`
                : `Join ${title}`
            }
          >
            <Text style={styles.registerText}>
              {registered ? 'JOINED' : 'JOIN'}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {/* ======================================================
          FRONT PARTY SURFACE
          ====================================================== */}

      <Animated.View
        style={[
          styles.frontLayer,
          {
            width: cardWidth,
            height,
          },
          {
            transform: [
              {
                translateX: frontTranslateX,
              },
              {
                translateY: frontTranslateY,
              },
              {
                scale: frontScale,
              },
            ],
            shadowOpacity: frontShadowOpacity,
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
          hitSlop={2}
          pressRetentionOffset={12}
          accessibilityRole="button"
          accessibilityLabel={`${title} party`}
          accessibilityHint={
            open
              ? 'Closes the party'
              : 'Opens the party'
          }
        >
          <Svg
            width={cardWidth}
            height={height}
            viewBox={`0 0 ${cardWidth} ${height}`}
            style={StyleSheet.absoluteFill}
          >
            <Path
              d={path}
              fill={COLORS.front}
            />
          </Svg>

          <View
            style={[
              styles.frontContent,
              pressed && styles.frontContentPressed,
            ]}
          >
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
                <Text style={styles.frontDate}>
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
   * PARTY PAGE
   * ==========================================================
   */

  partyPage: {
    position: 'absolute',

    left: 0,
    top: 0,

    borderRadius: RADIUS,

    backgroundColor: COLORS.page,

    overflow: 'hidden',
  },

  pageContent: {
    flex: 1,

    paddingTop: 28,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 74,
  },

  pageEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,

    marginBottom: 16,
  },

  liveIndicator: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: COLORS.cyan,
  },

  pageEyebrowText: {
    fontSize: 10,
    fontWeight: '800',

    letterSpacing: 1.5,

    color: COLORS.cyan,
  },

  pageTitle: {
    fontSize: 31,
    lineHeight: 34,

    fontWeight: '800',

    letterSpacing: -0.8,

    color: COLORS.white,
  },

  pageHost: {
    marginTop: 8,

    fontSize: 13,

    color: COLORS.secondary,
  },

  pageLocation: {
    marginTop: 4,

    fontSize: 13,

    color: COLORS.secondary,
  },

  metaRow: {
    position: 'absolute',

    left: 28,
    bottom: 22,

    flexDirection: 'row',

    gap: 28,
  },

  metaLabel: {
    fontSize: 9,
    fontWeight: '800',

    letterSpacing: 1.2,

    color: COLORS.tertiary,
  },

  metaValue: {
    marginTop: 3,

    fontSize: 12,
    fontWeight: '600',

    color: COLORS.white,
  },

  registerPosition: {
    position: 'absolute',

    right: 18,
    bottom: 16,
  },

  registerButton: {
    minWidth: 82,
    height: 44,

    paddingHorizontal: 18,

    borderRadius: 22,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.magenta,
  },

  registerButtonPressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  registerText: {
    fontSize: 12,
    fontWeight: '800',

    letterSpacing: 0.9,

    color: '#FFFFFF',
  },

  /*
   * ==========================================================
   * FRONT SURFACE
   * ==========================================================
   */

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
  },

  frontPressArea: {
    flex: 1,
  },

  frontContent: {
    flex: 1,

    justifyContent: 'space-between',

    paddingTop: 30,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 28,
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

  frontBottom: {
    paddingRight: 44,
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