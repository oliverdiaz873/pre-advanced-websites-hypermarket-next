"use client";
import { useState, useEffect } from "react";

/**
 * Tracks whether the viewport width is below a given breakpoint.
 * Used by `CategoryBanner` together with `animations.ts` to apply
 * shorter durations, reduced translateY, and tighter stagger on mobile.
 * Uses `window.matchMedia` internally — SSR-safe (defaults to `false` until hydration).
 * @param breakpoint - Max width in pixels to be considered "mobile" (default: 768).
 * @returns `true` when the viewport matches the mobile media query.
 */
export const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
};
