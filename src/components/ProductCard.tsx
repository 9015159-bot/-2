import React from 'react';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const defaultVariant = product.variants[0];

  return (
    <div className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Visual Slot - 65-70% height with subtle overflow protection */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle one-line quiet kicker tag (maximum 1 subtle tag, no pill clusters) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2 py-0.5 rounded tracking-wide">
            {product.badge}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-red-500 hover:bg-white'
          }`}
          aria-label={isFavorite ? '取消收藏' : '加入收藏'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>

        {/* Brix sweetness badge overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-stone-900 text-xs px-2 py-0.5 rounded font-mono font-medium shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{product.brix}° Brix</span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5 cursor-pointer" onClick={() => onSelectProduct(product)}>
          {/* Metadata line with typographic separators (no pill enclosures) */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{product.origin}</span>
            <span aria-hidden="true">·</span>
            <span>{product.season}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">{product.sweetnessLabel}</span>
          </div>

          <h3 className="font-serif-tc text-base font-semibold text-stone-900 group-hover:text-[#264134] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-stone-400">
              {defaultVariant.weight}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                NT$ {defaultVariant.price.toLocaleString()}
              </span>
              {defaultVariant.originalPrice && (
                <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                  NT$ {defaultVariant.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
            >
              詳情
            </button>
            <button
              onClick={() => onQuickAddToCart(product)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#264134] hover:bg-[#1b2f25] text-stone-50 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              title="加入購物車"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>加購</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
