export const colors = {
  // Core
  canvas: '#0B0A0D',

  // Surfaces
  surface: '#141318',
  surfaceElevated: '#1C1A21',
  surfaceInteractive: '#24212A',

  // Borders
  border: '#2B2832',
  borderStrong: '#3A3642',

  // Text
  textPrimary: '#F5F5F5',
  textSecondary: '#A7A5AA',
  textTertiary: '#6F6D74',
  textDisabled: '#4A484E',

  // Brand
  brand: '#E41BCD',
  brandPressed: '#BB16A8',

  // Connection / discovery
  connection: '#1BCDE4',

  // Semantic
  success: '#1BE497',
  warning: '#FFD34D',
  danger: '#FF3B30',

  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700' as const,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
  },

  heading: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700' as const,
  },

  body: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400' as const,
  },

  bodyMedium: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600' as const,
  },

  small: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400' as const,
  },

  caption: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700' as const,
    letterSpacing: 0.8,
  },

  button: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700' as const,
  },
} as const;

export const sizes = {
  buttonSmall: 40,
  buttonMedium: 48,
  buttonLarge: 56,

  iconButtonSmall: 36,
  iconButtonMedium: 44,
  iconButtonLarge: 52,

  input: 52,

  tabBar: 72,
} as const;