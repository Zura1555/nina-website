import { Variants } from "framer-motion";

/**
 * Fade in from bottom animation
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Simple fade in animation
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Scale in animation
 */
export const scaleIn: Variants = {
  initial: {
    scale: 0.95,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Stagger container for child animations
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Card hover animation
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

/**
 * Slide in from right (for mobile menu)
 */
export const slideInRight: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

/**
 * Backdrop fade animation
 */
export const backdropFade: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  animate: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Navigation items stagger
 */
export const navItemsStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

/**
 * Navigation item animation
 */
export const navItem: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Theme toggle rotation
 */
export const themeToggle: Variants = {
  light: {
    rotate: 0,
    scale: 1,
  },
  dark: {
    rotate: 180,
    scale: 1,
  },
  tap: {
    scale: 0.9,
  },
};

/**
 * Page transition wrapper
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Command palette animation
 */
export const commandPalette: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

/**
 * Backdrop for modal/dialog
 */
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * Block fade in animation
 */
export const blockFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Toggle content animation
 */
export const toggleContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * Chevron rotation for toggles
 */
export const chevronRotate: Variants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: 90,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Checkbox check animation
 */
export const checkboxCheck: Variants = {
  unchecked: {
    pathLength: 0,
  },
  checked: {
    pathLength: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

/**
 * List item slide in
 */
export const listItem: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Command list item hover
 */
export const commandListItem: Variants = {
  rest: {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  },
  hover: {
    backgroundColor: "var(--muted)",
    color: "var(--foreground)",
    transition: {
      duration: 0.1,
    },
  },
  selected: {
    backgroundColor: "var(--primary-lighter)",
    color: "var(--primary)",
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Cover image parallax
 */
export const coverParallax: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  scroll: {
    y: ["0%", "30%"],
    scale: 1.05,
    opacity: [1, 0],
    transition: {
      type: "tween",
      ease: "linear",
    },
  },
};

/**
 * Icon pop in
 */
export const iconPop: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Copy button feedback
 */
export const copyFeedback: Variants = {
  initial: {
    scale: 1,
  },
  success: {
    scale: [1, 0.9, 1],
    transition: {
      duration: 0.3,
    },
  },
};
