import { useTranslations } from 'next-intl'
import { categories } from '@/services/catalog/categories'
import './OfferFilters.css'

interface OfferFiltersProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    totalProducts: number
    filteredProducts: number
    isDrawer?: boolean
}

/**
 * Componente de filtros para ofertas.
 * 
 * NOTA DE ARQUITECTURA: Patrón de Composición + Responsive Rendering.
 * - Este componente es agnóstico a su contenedor.
 * - En Desktop: Se inyecta en un sidebar lateral estático.
 * - En Móviles: Se compone dentro de un Drawer para optimizar el espacio (Estrategia de renderizado condicional).
 */
const OfferFilters = ({
    selectedCategory,
    onCategoryChange,
    totalProducts,
    filteredProducts,
    isDrawer = false,
}: OfferFiltersProps) => {
    const t = useTranslations('offers');
    const tCategories = useTranslations('categories');

    return (
        <div className={`offer-filters ${isDrawer ? 'offer-filters--drawer' : ''}`}>
            {!isDrawer && (
                <div className="offer-filters__header">
                    <h2 className="offer-filters__title">{t('filters.title')}</h2>
                    <div className="offer-filters__badge">
                        {filteredProducts} / {totalProducts}
                    </div>
                </div>
            )}

            {/* Sección de Categorías */}
            <div className="offer-filters__section">
                
                <label key="category-all" className={`offer-filters__option ${selectedCategory === 'all' ? 'is-active' : ''}`}>
                    <input
                        type="radio"
                        id="category-all"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="offer-filters__radio"
                    />
                    <span className="offer-filters__indicator is-active-target" />
                    <span className="offer-filters__label">
                        {t('filters.all_categories')}
                    </span>
                </label>

                {categories.map((category) => (
                    <label key={category.id} className={`offer-filters__option ${selectedCategory === category.id ? 'is-active' : ''}`}>
                        <input
                            type="radio"
                            id={`category-${category.id}`}
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="offer-filters__radio"
                        />
                        <span className="offer-filters__indicator is-active-target" />
                        <span className="offer-filters__label">
                            {tCategories(category.id)}
                        </span>
                    </label>
                ))}
            </div>

            {/* Info de filtros */}
            <div className="offer-filters__info">
                {t.rich('filters.info', {
                    filtered: filteredProducts,
                    total: totalProducts,
                    strong: (chunks) => <strong>{chunks}</strong>,
                })}
            </div>
        </div>
    )
}

export default OfferFilters
