import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  Stack,
  router,
  usePathname,
} from 'expo-router';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import Svg, {
  Circle,
  Path,
} from 'react-native-svg';

import {
  RqllyText,
  colors,
  radius,
  spacing,
} from '../../components/ui';

type NavRoute =
  | '/discover'
  | '/messages'
  | '/profile';

type NavItem = {
  route: NavRoute;
  label: string;
  icon: 'discover' | 'messages' | 'profile';
};

const NAV_ITEMS: NavItem[] = [
  {
    route: '/discover',
    label: 'Discover',
    icon: 'discover',
  },
  {
    route: '/messages',
    label: 'Messages',
    icon: 'messages',
  },
  {
    route: '/profile',
    label: 'Profile',
    icon: 'profile',
  },
];

export default function AppLayout() {
  const pathname = usePathname();

  const isCreate =
    pathname === '/create' ||
    pathname.startsWith('/create/');

  const isActive = (
    route: NavRoute,
  ) =>
    pathname === route ||
    pathname.startsWith(
      `${route}/`,
    );

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,

          contentStyle: {
            backgroundColor:
              colors.canvas,
          },

          animation: 'fade',
          animationDuration: 220,
        }}
      >
        <Stack.Screen name="discover" />
        <Stack.Screen name="create" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="party/[id]" />
      </Stack>

      <SafeAreaView
        edges={['bottom']}
        style={styles.safeArea}
      >
        <View
          style={styles.navigation}
        >
          <NavigationItem
            item={NAV_ITEMS[0]}
            active={isActive(
              NAV_ITEMS[0].route,
            )}
            onPress={() =>
              router.replace(
                '/discover',
              )
            }
          />

          <View
            style={styles.createArea}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create a party"
              onPress={() =>
                router.push(
                  '/create',
                )
              }
              style={({ pressed }) => [
                styles.createButton,
                pressed &&
                  styles.createButtonPressed,
              ]}
            >
              <RqllyText
                variant="display"
                color="primary"
                align="center"
                style={
                  styles.createIcon
                }
              >
                +
              </RqllyText>
            </Pressable>

            <RqllyText
              variant="caption"
              color={
                isCreate
                  ? 'brand'
                  : 'tertiary'
              }
              align="center"
              style={
                styles.createLabel
              }
            >
              Create
            </RqllyText>
          </View>

          <NavigationItem
            item={NAV_ITEMS[1]}
            active={isActive(
              NAV_ITEMS[1].route,
            )}
            onPress={() =>
              router.replace(
                '/messages',
              )
            }
          />

          <NavigationItem
            item={NAV_ITEMS[2]}
            active={isActive(
              NAV_ITEMS[2].route,
            )}
            onPress={() =>
              router.replace(
                '/profile',
              )
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function NavigationItem({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        item.label
      }
      accessibilityState={{
        selected: active,
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.navigationItem,
        pressed &&
          styles.navigationItemPressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          active &&
            styles.iconContainerActive,
        ]}
      >
        <NavIcon
          type={item.icon}
          active={active}
        />
      </View>

      <RqllyText
        variant="caption"
        color={
          active
            ? 'primary'
            : 'tertiary'
        }
        align="center"
        style={
          styles.navigationLabel
        }
      >
        {item.label}
      </RqllyText>
    </Pressable>
  );
}

function NavIcon({
  type,
  active,
}: {
  type: NavItem['icon'];
  active: boolean;
}) {
  const color = active
    ? colors.white
    : colors.textTertiary;

  if (type === 'discover') {
    return (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (type === 'messages') {
    return (
      <Svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.3-.7L4 20l1.6-3.9A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx="12"
        cy="8"
        r="3.5"
        stroke={color}
        strokeWidth={1.8}
      />

      <Path
        d="M5.5 20c.7-3.2 2.8-5 6.5-5s5.8 1.8 6.5 5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      colors.canvas,
  },

  safeArea: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,
  },

  navigation: {
    height: 76,

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:
      'space-between',

    backgroundColor:
      colors.surface,

    borderTopWidth: 1,
    borderTopColor:
      colors.border,
  },

  navigationItem: {
    width: 72,

    height: 70,

    alignItems: 'center',
    justifyContent:
      'flex-start',

    paddingTop: 10,
  },

  navigationItemPressed: {
    opacity: 0.65,
  },

  iconContainer: {
    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent:
      'center',

    borderRadius: radius.pill,
  },

  iconContainerActive: {
    backgroundColor:
      colors.surfaceInteractive,
  },

  navigationLabel: {
    marginTop: 4,

    fontSize: 10,
    lineHeight: 13,

    letterSpacing: 0.3,
  },

  createArea: {
    width: 76,

    alignItems: 'center',

    marginTop: -26,
  },

  createButton: {
    width: 58,
    height: 58,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent:
      'center',

    backgroundColor:
      colors.brand,

    borderWidth: 4,
    borderColor:
      colors.canvas,
  },

  createButtonPressed: {
    transform: [
      {
        scale: 0.94,
      },
    ],
  },

  createIcon: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '500',
  },

  createLabel: {
    marginTop: 4,
  },
});