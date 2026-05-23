import { MetadataRoute } from 'next'
import { categories } from '@/services/catalog/categories'
import { products } from '@/services/catalog/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hipermercadosuperior.com'
  const locales = ['es', 'en']

  // Static pages con i18n
  const staticPages = locales.flatMap((locale) =>
    [
      '',
      '/offers',
      '/contact',
      '/legal/privacy',
      '/legal/terms',
    ].map((route) => ({
      url: `${baseUrl}${locale === 'es' ? '' : '/en'}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    }))
  )

  // Category pages con i18n
  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${baseUrl}${locale === 'es' ? '' : '/en'}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/category/${category.id}`,
          en: `${baseUrl}/en/category/${category.id}`,
        },
      },
    }))
  )

  // Product pages con i18n
  const productPages = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${baseUrl}${locale === 'es' ? '' : '/en'}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
      alternates: {
        languages: {
          es: `${baseUrl}/product/${product.id}`,
          en: `${baseUrl}/en/product/${product.id}`,
        },
      },
    }))
  )

  return [...staticPages, ...categoryPages, ...productPages]
}
