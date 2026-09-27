export const motion = {
  duration: {
    instant: 100,
    fast: 180,
    normal: 280,
    entrance: 360,
    slow: 600,
    ambient: 1200,
  },

  delay: {
    none: 0,
    first: 40,
    second: 90,
    third: 140,
    fourth: 190,
    fifth: 240,
  },

  distance: {
    small: 8,
    normal: 16,
    large: 24,
  },

  scale: {
    pressed: 0.97,
    entrance: 0.985,
  },
} as const;