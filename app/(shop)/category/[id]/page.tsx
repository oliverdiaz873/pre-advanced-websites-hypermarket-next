import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCarouselSection from '@/src/features/products/components/ProductCarouselSection';
import { categories } from '@/src/data/categories';
import { products } from '@/src/data/products';
import { sectionSlugToProductCategoria, subcategorySlugFromHref } from '@/src/data/categorySectionMap';

type CategoryPageProps = {
    params: Promise<{ id: string }>;
};

function getCategory(id: string) {
    return categories.find((category) => category.id === id);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { id } = await params;
    const category = getCategory(id);

    if (!category) {
        return {
            title: 'Categoria no encontrada | Hipermercado Superior',
        };
    }

    const subcategories = category.subcategories.map((subcategory) => subcategory.name).join(', ');

    return {
        title: `${category.name} | Hipermercado Superior`,
        description: `Explora nuestra seleccion de ${category.name}: ${subcategories}.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { id } = await params;
    const category = getCategory(id);

    if (!category) {
        notFound();
    }

    const sections = category.subcategories
        .map((subcategory) => {
            const slug = subcategorySlugFromHref(subcategory.href);
            const productCategory = sectionSlugToProductCategoria(slug);
            const sectionProducts = products.filter((product) => product.categoria === productCategory);

            return {
                slug,
                title: subcategory.name,
                products: sectionProducts,
            };
        })
        .filter((section) => section.products.length > 0);

    return (
        <div className="category-page-content">
            <section className="mx-auto w-full max-w-7xl px-4 pb-2 pt-8 md:px-8">
                <h1 className="text-3xl font-bold text-neutral-950">{category.name}</h1>
                <p className="mt-2 max-w-2xl text-neutral-600">
                    Selecciona una seccion para explorar productos disponibles en {category.name}.
                </p>
            </section>

            {sections.map((section, index) => (
                <ProductCarouselSection
                    key={section.slug}
                    title={section.title}
                    products={section.products}
                    id={section.slug}
                    idPrefix={`${category.id}-${section.slug}`}
                    className={index === 0 ? 'category-page-first-carousel' : undefined}
                />
            ))}
        </div>
    );
}
