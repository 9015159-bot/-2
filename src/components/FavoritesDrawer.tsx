import React from 'react';
import { X, Heart, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onRemoveFavorite,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="font-serif-tc text-lg font-bold text-stone-900">
                心願收藏清單
              </h2>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-mono font-medium">
                {favoriteProducts.length} 件
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="關閉收藏"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 space-y-4">
            {favoriteProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <div className="font-serif-tc text-base font-semibold text-stone-700">
                  尚無收藏的果物
                </div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  瀏覽當季新鮮果物時，點擊愛心圖示即可加入收藏，隨時掌握產期與價格變動。
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-[#264134] text-white text-xs font-medium rounded-lg hover:bg-[#1b2f25] transition-colors cursor-pointer"
                >
                  去探索當季果物
                </button>
              </div>
            ) : (
              favoriteProducts.map((p) => {
                const defaultVariant = p.variants[0];
                return (
                  <div key={p.id} className="pt-4 first:pt-0 flex gap-3.5">
                    <div
                      className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              onSelectProduct(p);
                              onClose();
                            }}
                            className="font-serif-tc text-xs font-semibold text-stone-900 leading-tight hover:text-[#264134] cursor-pointer line-clamp-1"
                          >
                            {p.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFavorite(p.id)}
                            className="text-stone-400 hover:text-red-500 p-0.5 cursor-pointer"
                            title="取消收藏"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                          <span>{p.origin}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-emerald-800">甜度 {p.brix}°</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                          NT$ {defaultVariant.price.toLocaleString()}
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(p);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#264134] hover:bg-[#1b2f25] text-white text-[11px] font-medium rounded transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>加購</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            >
              返回繼續瀏覽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
