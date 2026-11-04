import React, { useState, useMemo } from 'react';
import { FruitCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onQuickAddToCart,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory>('all');
  const [minBrix, setMinBrix] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'brix-desc' | 'price-asc' | 'price-desc'>('featured');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部頂級果物' },
    { id: 'season', label: '當令盛產旬果' },
    { id: 'import', label: '日本與各國空運' },
    { id: 'direct', label: '台灣產地契作直送' },
    { id: 'gift', label: '節慶尊榮禮盒' },
  ] as const;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Min Brix filter
        if (minBrix > 0 && p.brix < minBrix) {
          return false;
        }
        // Origin filter
        if (selectedOrigin !== 'all') {
          if (selectedOrigin === 'taiwan' && !p.origin.includes('台灣')) return false;
          if (selectedOrigin === 'japan' && !p.origin.includes('日本')) return false;
          if (selectedOrigin === 'chile' && !p.origin.includes('智利')) return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchOrigin = p.origin.toLowerCase().includes(q) || p.originRegion.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchOrigin) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'brix-desc') {
          return b.brix - a.brix;
        }
        if (sortBy === 'price-asc') {
          return a.variants[0].price - b.variants[0].price;
        }
        if (sortBy === 'price-desc') {
          return b.variants[0].price - a.variants[0].price;
        }
        return 0; // default featured
      });
  }, [products, selectedCategory, minBrix, selectedOrigin, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setMinBrix(0);
    setSelectedOrigin('all');
    setSortBy('featured');
  };

  return (
    <section id="products" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Selected Harvest · 嚴選當季果物
          </div>
          <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            旬味選品 · 光波糖度檢驗認證
          </h2>
        </div>
        <p className="text-xs text-stone-500 max-w-md">
          依季節更迭精選當令最高峰風味，所有果品均於出貨日前以低溫冷鏈專車運送，確保甜度與水份如產地現採。
        </p>
      </div>

      {/* Category Tabs (Segmented Control - functional buttons) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-xl overflow-x-auto no-scrollbar mb-6">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-stone-50 border border-stone-200 rounded-xl mb-8 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          {/* Sweetness Brix selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">甜度標準:</span>
            <select
              value={minBrix}
              onChange={(e) => setMinBrix(Number(e.target.value))}
              className="bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value={0}>不限甜度</option>
              <option value={15}>15°+ (甘甜順口)</option>
              <option value={17}>17°+ (蜜糖醇厚)</option>
              <option value={19}>19°+ (極致爆甜)</option>
            </select>
          </div>

          {/* Origin selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">產地區域:</span>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">所有產地</option>
              <option value="taiwan">台灣在地 (屏東/梨山)</option>
              <option value="japan">日本產地 (長野/佐賀/靜岡)</option>
              <option value="chile">南美智利 (安地斯)</option>
            </select>
          </div>

          {(minBrix > 0 || selectedOrigin !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>重置篩選</span>
            </button>
          )}
        </div>

        {/* Sort by */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 font-medium">排序方式:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
          >
            <option value="featured">果嶼主廚推薦</option>
            <option value="brix-desc">甜度最高 (Brix °)</option>
            <option value="price-asc">價格：由低到高</option>
            <option value="price-desc">價格：由高到低</option>
          </select>
        </div>
      </div>

      {/* Product Grid - 3 Column Desktop, 2 Column Tablet */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8 space-y-3">
          <div className="font-serif-tc text-lg text-stone-700">查無符合條件的果物</div>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            目前篩選條件暫無相符品項，建議調整甜度或產地條件，或直接聯繫專屬客服為您預約採收。
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-stone-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
          >
            查看全部果物
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProduct={onSelectProduct}
              onQuickAddToCart={onQuickAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};
