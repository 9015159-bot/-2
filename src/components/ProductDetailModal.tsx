import React, { useState } from 'react';
import { X, Sparkles, Check, Heart, ShieldCheck, Thermometer, Clock, MapPin, Plus, Minus } from 'lucide-react';
import { Product, ProductVariant } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!isOpen || !product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-700 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
          aria-label="關閉視窗"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Origin Badge */}
          <div className="relative bg-stone-100 flex flex-col justify-between p-6">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-inner bg-white">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-[11px] px-2.5 py-0.5 rounded font-mono">
                Brix {product.brix}° 糖度保證
              </div>
            </div>

            {/* Farm Origin Box */}
            <div className="mt-4 p-3 bg-white/80 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>產地履歷：{product.origin} · {product.originRegion}</span>
              </div>
              <p className="text-stone-500 leading-relaxed text-[11px]">
                {product.farmerNote}
              </p>
            </div>
          </div>

          {/* Right Column: PDP Purchase Module & Taste Profile */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & season metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>{product.season}</span>
                <span aria-hidden="true">·</span>
                <span>{product.harvestDate}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">{product.sweetnessLabel}</span>
              </div>

              <h2 className="font-serif-tc text-2xl font-bold text-stone-900 mt-1">
                {product.name}
              </h2>
              {product.japaneseName && (
                <div className="text-xs text-stone-400 font-sans">{product.japaneseName} · {product.englishName}</div>
              )}

              <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Flavor Profile Bars */}
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>果物風味指標 (Flavor Profile)</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-stone-600">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>甜度濃郁感</span>
                      <span className="font-mono">{product.flavorProfile.sweetness}/5</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(product.flavorProfile.sweetness / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>果汁香氣</span>
                      <span className="font-mono">{product.flavorProfile.aroma}/5</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(product.flavorProfile.aroma / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>微酸爽口度</span>
                      <span className="font-mono">{product.flavorProfile.acidity}/5</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-rose-400 h-full rounded-full" style={{ width: `${(product.flavorProfile.acidity / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>爽脆爆汁感</span>
                      <span className="font-mono">{product.flavorProfile.crispness}/5</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full" style={{ width: `${(product.flavorProfile.crispness / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preservation & Shelf life note */}
              <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{product.storageTip}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{product.shelfLife}</span>
                </div>
              </div>

              {/* Variant Specification Selection */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-stone-800">
                  規格與包裝方案：
                </label>
                <div className="space-y-1.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#264134] bg-emerald-50/50 text-stone-900 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#264134] bg-[#264134]' : 'border-stone-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{variant.name}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono font-bold tabular-nums">
                            NT$ {variant.price.toLocaleString()}
                          </span>
                          {variant.originalPrice && (
                            <span className="font-mono text-stone-400 line-through text-[11px]">
                              NT$ {variant.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper & Add to Cart Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-white transition-colors cursor-pointer"
                  aria-label="減少數量"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-white transition-colors cursor-pointer"
                  aria-label="增加數量"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  addedAnimation
                    ? 'bg-emerald-700'
                    : 'bg-[#264134] hover:bg-[#1b2f25]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>已加入購物籃！</span>
                  </>
                ) : (
                  <>
                    <span>加入購物籃</span>
                    <span className="font-mono tabular-nums">
                      · NT$ {(selectedVariant.price * quantity).toLocaleString()}
                    </span>
                  </>
                )}
              </button>

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                aria-label="收藏果物"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
