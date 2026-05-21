import { MetadataRoute } from 'next'
import { categories } from '@/services/catalog/categories'
import { products } from '@/services/catalog/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hipermercadosuperior.com'

  // Static pages
  const staticPages = [
    '',
    '/offers',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
