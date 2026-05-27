/**
 * Reusable animation configurations for CategoryBanner and other home components
 */

export const EASING_CURVE = [0.25, 0.46, 0.45, 0.94] as [
  number,
  number,
  number,
  number
];

/**
 * Viewport configuration for scroll-triggered animations
 * Triggers once when element comes into view, with 40px margin buffer
 */
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-40px" as const,
};

/**
 * Text animation variant: slides up from bottom with fade-in
 * Used for individual text elements (title, description, button)
 */
export const textAnimationVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASING_CURVE,
    },
  },
};

/**
 * Transition configurations for staggered text animations
 * Each element has a progressive delay for cascading effect
 */
export const TEXT_TRANSITION_CONFIGS = {
  title: {
    duration: 0.6,
    delay: 0.1,
    ease: EASING_CURVE,
  },
  description: {
    duration: 0.6,
    delay: 0.2,
    ease: EASING_CURVE,
  },
  button: {
    duration: 0.6,
    delay: 0.3,
    ease: EASING_CURVE,
  },
};

/**
 * Container animation variant: fade-in with slight upward movement
 * Triggers container entrance before child elements
 */
export const containerVariants = (index: number) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: EASING_CURVE,
      staggerChildren: 0.12,
    },
  },
});

/**
 * Child animation variant: subtle fade and slide for container children
 */
export const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING_CURVE,
    },
  },
};

/**
 * Floating image animation configuration
 * Continuous oscillation for premium visual effect
 */
export const floatTransition = {
  y: {
    duration: 3.2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
  rotate: {
    duration: 4.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
};
