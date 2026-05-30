"use client";

import { useRef } from "react";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import {
  motion,
  useInView,
} from "framer-motion";
import {
  VIEWPORT_CONFIG,
  textAnimationVariants,
  TEXT_TRANSITION_CONFIGS,
  containerVariants,
  floatTransition,
} from "./animations";
import "./CategoryBanner.css";

/**
 * Properties for the CategoryBanner component.
 */
export interface CategoryBannerProps {
  /** The title of the category (e.g. "Alimentos") */
  title: string;
  /** A short marketing description or details about the category */
  description: string;
  /** Text label for the CTA button */
  buttonText: string;
  /** Absolute or relative routing path when clicking the button */
  buttonHref: string;
  /** Path to the category product spotlight image in the public folder */
  imageSrc: string;
  /** Alternative accessibility text for the image */
  imageAlt: string;
  /** TailwindCSS hex color or CSS custom property value for the gradient start */
  gradientFrom: string;
  /** TailwindCSS hex color or CSS custom property value for the gradient end */
  gradientTo: string;
  /** Core theme glow and outline color matching the product context */
  accentColor: string;
  /** Horizontal animation stagger factor based on list order */
  index: number;
  /** Swaps content columns (true: image left / text right; false: text left / image right) */
  reversed?: boolean;
}

/**
 * Reusable CategoryBanner Component
 * 
 * Renders a premium, glassmorphic banner for an e-commerce category.
 * Features an organic alternating column layout on desktop, responsive stacking on mobile,
 * scroll-reveal staggered animations for card entrance, and a smooth continuous 
 * floating animation for the featured product image.
 */
const CategoryBanner = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  gradientFrom,
  gradientTo,
  accentColor,
  index,
  reversed = false,
}: CategoryBannerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  /** Hooks into scroll intersection to trigger staggered entrance animations once visible */
  const isInView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const bannerContainerVariants = containerVariants(index);

  return (
    <Link href={buttonHref} className="category-banner-link">
      <motion.div
        ref={ref}
        variants={bannerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="category-banner-card"
        style={
          {
            "--gradient-from": gradientFrom,
            "--gradient-to": gradientTo,
            "--accent-color": accentColor,
          } as React.CSSProperties
        }
      >
      {/* Background gradient layer */}
      <div className="category-banner-bg" />

      {/* Decorative orbs */}
      <div className="category-banner-orb category-banner-orb--1" />
      <div className="category-banner-orb category-banner-orb--2" />

      {/* Content */}
      <div
        className={`category-banner-content ${
          reversed ? "category-banner-content--reversed" : ""
        }`}
      >
        {/* Text Column */}
        <div className="category-banner-text">
          <motion.h3
            variants={textAnimationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            transition={TEXT_TRANSITION_CONFIGS.title}
            className="category-banner-title"
          >
            {title}
          </motion.h3>

          <motion.p
            variants={textAnimationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            transition={TEXT_TRANSITION_CONFIGS.description}
            className="category-banner-description"
          >
            {description}
          </motion.p>

          <motion.div
            variants={textAnimationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            transition={TEXT_TRANSITION_CONFIGS.button}
          >
            <div className="category-banner-cta">
              <span>{buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.66663 4L12.6666 8L8.66663 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Image Column */}
        <motion.div
          className="category-banner-image-wrapper"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1.5, 0],
          }}
          transition={floatTransition}
        >
          <div className="category-banner-image-glow" />
          <div className="category-banner-image-container">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={420}
              height={420}
              className="category-banner-image"
            />
          </div>
        </motion.div>
      </div>
      </motion.div>
    </Link>
  );
};

export default CategoryBanner;
