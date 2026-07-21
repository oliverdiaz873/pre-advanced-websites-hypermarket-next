import { Category, Subcategory } from '@/types/category'
import { subcategorySlugFromHref } from '@/services/catalog/categorySectionMap'

export function getCategoryName(
  category: Category,
  t: (key: string) => string
): string {
  const key = category.id
  const translated = t(key)
  return translated !== key ? translated : category.name
}

export function getSubcategoryName(
  subcategory: Subcategory,
  t: (key: string) => string
): string {
  const slug = subcategorySlugFromHref(subcategory.href)
  const key = `sub.${slug}`
  const translated = t(key)
  return translated !== key ? translated : subcategory.name
}
