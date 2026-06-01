"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import CategoryBanner from "./CategoryBanner";

/**
 * Interface representing metadata for each category banner structure.
 */
interface CategoryData {
  /** Unique ID for key properties */
  id: string;
  /** Translation subkey for category title */
  titleKey: string;
  /** Translation subkey for marketing details */
  descriptionKey: string;
  /** Translation subkey for CTA button */
  buttonTextKey: string;
  /** Navigation target path */
  href: string;
  /** Source path for the spotlight transparent PNG/WebP image */
  imageSrc: string;
  /** Hex code for background gradient start */
  gradientFrom: string;
  /** Hex code for background gradient end */
  gradientTo: string;
  /** Hex code matching the active component glow */
  accentColor: string;
}

/**
 * Metadata list defining color mappings, assets, routing, and translation keys for the 8 featured categories.
 */
const categoryData: CategoryData[] = [
  {
    id: "alimentos",
    titleKey: "alimentos.title",
    descriptionKey: "alimentos.description",
    buttonTextKey: "alimentos.button",
    href: "/category/alimentos",
    imageSrc: "/assets/images/categories/food.png",
    gradientFrom: "#15803d",
    gradientTo: "#22c55e",
    accentColor: "#86efac",
  },
  {
    id: "electrodomesticos",
    titleKey: "electrodomesticos.title",
    descriptionKey: "electrodomesticos.description",
    buttonTextKey: "electrodomesticos.button",
    href: "/category/electrodomesticos",
    imageSrc: "/assets/images/categories/appliances.png",
    gradientFrom: "#1e3a5f",
    gradientTo: "#3b82f6",
    accentColor: "#60a5fa",
  },
  {
    id: "tecnologia",
    titleKey: "tecnologia.title",
    descriptionKey: "tecnologia.description",
    buttonTextKey: "tecnologia.button",
    href: "/category/tecnologia",
    imageSrc: "/assets/images/categories/technology.png",
    gradientFrom: "#070605",
    gradientTo: "#17100b",
    accentColor: "#f97316",
  },
  {
    id: "ropa",
    titleKey: "ropa.title",
    descriptionKey: "ropa.description",
    buttonTextKey: "ropa.button",
    href: "/category/ropa",
    imageSrc: "/assets/images/categories/clothing.png",
    gradientFrom: "#1a0a1c",
    gradientTo: "#2d1b30",
    accentColor: "#e879f9",
  },
  {
    id: "muebles",
    titleKey: "muebles.title",
    descriptionKey: "muebles.description",
    buttonTextKey: "muebles.button",
    href: "/category/muebles-y-decoracion",
    imageSrc: "/assets/images/categories/furniture-and-decor.png",
    gradientFrom: "#78350f",
    gradientTo: "#d97706",
    accentColor: "#fbbf24",
  },
  {
    id: "farmacia",
    titleKey: "farmacia.title",
    descriptionKey: "farmacia.description",
    buttonTextKey: "farmacia.button",
    href: "/category/farmacia",
    imageSrc: "/assets/images/categories/pharmacy.png",
    gradientFrom: "#064e3b",
    gradientTo: "#10b981",
    accentColor: "#6ee7b7",
  },
  {
    id: "ferreteria",
    titleKey: "ferreteria.title",
    descriptionKey: "ferreteria.description",
    buttonTextKey: "ferreteria.button",
    href: "/category/ferreteria",
    imageSrc: "/assets/images/categories/hardware-store.png",
    gradientFrom: "#44403c",
    gradientTo: "#78716c",
    accentColor: "#a8a29e",
  },
  {
    id: "juguetes",
    titleKey: "juguetes.title",
    descriptionKey: "juguetes.description",
    buttonTextKey: "juguetes.button",
    href: "/category/juguetes",
    imageSrc: "/assets/images/categories/toys.png",
    gradientFrom: "#be185d",
    gradientTo: "#ec4899",
    accentColor: "#f472b6",
  },
];

/** Animation preset parameters to fade/reveal the section header dynamically when scrolled into view. */
const sectionTitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

/**
 * CategoryBannersSection Wrapper Component
 * 
 * Aggregates and displays the curated category showcases dynamically.
 * Features customizable layout parameters, next-intl translations integration,
 * scroll tracking hooks, alternating card layouts, and premium card wrappers.
 */
const CategoryBannersSection = () => {
  /** Utilizes standard translations namespace under home.category_banners */
  const t = useTranslations("home.category_banners");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section
      id="category-banners"
      className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4 md:pt-10 md:pb-6"
    >
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        variants={sectionTitleVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          {t("section_title")}
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-500 max-w-xl mx-auto">
          {t("section_subtitle")}
        </p>
      </motion.div>

      {/* Banners Grid */}
      <div className="flex flex-col gap-6 md:gap-8">
        {categoryData.map((category, index) => (
          <CategoryBanner
            key={category.id}
            title={t(category.titleKey)}
            description={t(category.descriptionKey)}
            buttonText={t(category.buttonTextKey)}
            buttonHref={category.href}
            imageSrc={category.imageSrc}
            imageAlt={t(category.titleKey)}
            gradientFrom={category.gradientFrom}
            gradientTo={category.gradientTo}
            accentColor={category.accentColor}
            index={index}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryBannersSection;


