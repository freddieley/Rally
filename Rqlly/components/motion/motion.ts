export const motion = {
  duration: {
    instant: 100,
    press: 140,
    fast: 180,
    normal: 280,
    navigation: 320,
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
    sixth: 290,
  },

  distance: {
    small: 8,
    normal: 16,
    large: 24,
  },

  scale: {
    pressed: 0.975,
    entrance: 0.985,
  },

  spring: {
    press: {
      damping: 18,
      stiffness: 300,
      mass: 0.5,
    },

    entrance: {
      damping: 19,
      stiffness: 180,
      mass: 0.8,
    },

    confirmation: {
      damping: 12,
      stiffness: 300,
      mass: 0.7,
    },
  },
} as const;