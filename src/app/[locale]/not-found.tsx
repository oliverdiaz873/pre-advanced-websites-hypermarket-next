import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');

  return {
    title: t('seo.title'),
    description: t('seo.description'),
    robots: { index: false, follow: false },
  };
}

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <p className="text-gray-500">La página que buscas no existe en Hipermercado Superior.</p>
    </main>
  );
}
