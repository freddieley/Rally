import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Stack, router, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RqllyText,
  colors,
  radius,
  sizes,
  spacing,
} from '../../components/ui';

type NavItem = {
  route: '/discover' | '/messages' | '/profile';
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    route: '/discover',
    label: 'Discover',
    icon: '⌂',
  },
  {
    route: '/messages',
    label: 'Messages',
    icon: '○',
  },
  {
    route: '/profile',
    label: 'Profile',
    icon: '◉',
  },
];

export default function AppLayout() {
  const pathname = usePathname();

  const isCreate =
    pathname === '/create' ||
    pathname.startsWith('/create/');

  const isActive = (route: NavItem['route']) =>
    pathname === route ||
    pathname.startsWith(`${route}/`);

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.canvas,
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
        style={styles.navigationSafeArea}
      >
        <View style={styles.navigation}>
          <View style={styles.navigationSide}>
            <NavigationItem
              item={NAV_ITEMS[0]}
              active={isActive(NAV_ITEMS[0].route)}
              onPress={() =>
                router.replace('/discover')
              }
            />
          </View>

          <View style={styles.navigationCenter}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create a party"
              onPress={() => router.push('/create')}
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.createButtonPressed,
              ]}
            >
              <RqllyText
                variant="display"
                color="primary"
                align="center"
                style={styles.createIcon}
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
              style={styles.createLabel}
            >
              Create
            </RqllyText>
          </View>

          <View style={styles.navigationSide}>
            <NavigationItem
              item={NAV_ITEMS[1]}
              active={isActive(NAV_ITEMS[1].route)}
              onPress={() =>
                router.replace('/messages')
              }
            />

            <NavigationItem
              item={NAV_ITEMS[2]}
              active={isActive(NAV_ITEMS[2].route)}
              onPress={() =>
                router.replace('/profile')
              }
            />
          </View>
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
      accessibilityLabel={item.label}
      accessibilityState={{
        selected: active,
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.navigationItem,
        pressed && styles.navigationItemPressed,
      ]}
    >
      <RqllyText
        variant="heading"
        color={active ? 'primary' : 'tertiary'}
        align="center"
        style={styles.navigationIcon}
      >
        {item.icon}
      </RqllyText>

      <RqllyText
        variant="caption"
        color={active ? 'primary' : 'tertiary'}
        align="center"
      >
        {item.label}
      </RqllyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  navigationSafeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },

  navigation: {
    minHeight: sizes.tabBar + spacing.lg,

    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,

    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    backgroundColor: colors.surface,

    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  navigationSide: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  navigationCenter: {
    width: 76,
    alignItems: 'center',

    marginTop: -22,
  },

  navigationItem: {
    minWidth: 64,
    minHeight: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },

  navigationItemPressed: {
    opacity: 0.65,
  },

  navigationIcon: {
    marginBottom: 2,
  },

  createButton: {
    width: 58,
    height: 58,

    borderRadius: radius.pill,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.brand,

    borderWidth: 3,
    borderColor: colors.canvas,
  },

  createButtonPressed: {
    transform: [
      {
        scale: 0.94,
      },
    ],
  },

  createIcon: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '500',
  },

  createLabel: {
    marginTop: 3,
  },
});