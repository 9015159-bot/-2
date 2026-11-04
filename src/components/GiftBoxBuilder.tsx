import React, { useState } from 'react';
import { GIFT_BOX_OPTIONS, FRUITS_FOR_GIFT_BOX, GIFT_BOX_IMAGE } from '../data/fruits';
import { Gift, Check, Plus, Trash2, Sparkles, MessageSquareHeart } from 'lucide-react';
import { CartItem } from '../types';

interface GiftBoxBuilderProps {
  onAddCustomGiftBox: (item: CartItem) => void;
}

export const GiftBoxBuilder: React.FC<GiftBoxBuilderProps> = ({ onAddCustomGiftBox }) => {
  const [selectedBox, setSelectedBox] = useState(GIFT_BOX_OPTIONS[1]); // Default to 4-fruit wooden box
  const [selectedFruits, setSelectedFruits] = useState<string[]>([
    FRUITS_FOR_GIFT_BOX[0].id, // Muscat
    FRUITS_FOR_GIFT_BOX[1].id, // Mango
    FRUITS_FOR_GIFT_BOX[3].id, // Cherry
  ]);
  const [ribbonColor, setRibbonColor] = useState('香檳金緻絲緞帶');
  const [cardMessage, setCardMessage] = useState('吉祥如意 · 闔家安康，致上最甜蜜的節慶心意。');
  const [justAdded, setJustAdded] = useState(false);

  const ribbons = [
    { name: '香檳金緻絲緞帶', colorClass: 'bg-amber-200 border-amber-400' },
    { name: '森綠手捻棉緞帶', colorClass: 'bg-emerald-800 border-emerald-950' },
    { name: '喜慶典雅緋紅緞帶', colorClass: 'bg-rose-700 border-rose-900' },
  ];

  const presetMessages = [
    '吉祥如意 · 闔家安康，致上最甜蜜的節慶心意。',
    '歲月靜好 · 碩果豐收，感謝一路以來的信任與相伴。',
    '福壽雙全 · 喜樂順遂，敬祝長輩松柏常青。',
    '春和景明 · 蒸蒸日上，祝賀貴公司業績長紅！',
  ];

  // Calculate total price
  const fruitsPriceTotal = selectedFruits.reduce((sum, fruitId) => {
    const f = FRUITS_FOR_GIFT_BOX.find((item) => item.id === fruitId);
    return sum + (f ? f.price : 0);
  }, 0);
  const totalPrice = selectedBox.basePrice + fruitsPriceTotal;

  // Add a fruit to selected
  const handleAddFruit = (fruitId: string) => {
    if (selectedFruits.length < selectedBox.capacity) {
      setSelectedFruits([...selectedFruits, fruitId]);
    }
  };

  // Remove a fruit by index
  const handleRemoveFruit = (index: number) => {
    const updated = [...selectedFruits];
    updated.splice(index, 1);
    setSelectedFruits(updated);
  };

  const handleBoxChange = (box: typeof GIFT_BOX_OPTIONS[0]) => {
    setSelectedBox(box);
    // Trim if capacity is smaller
    if (selectedFruits.length > box.capacity) {
      setSelectedFruits(selectedFruits.slice(0, box.capacity));
    }
  };

  const handleAddToCart = () => {
    const selectedFruitNames = selectedFruits.map((id) => {
      const f = FRUITS_FOR_GIFT_BOX.find((item) => item.id === id);
      return f ? f.name : id;
    });

    const customCartItem: CartItem = {
      cartId: `custom-giftbox-${Date.now()}`,
      productId: 'custom-gift-box',
      productName: `客製旬果禮盒 · ${selectedBox.name}`,
      variantId: selectedBox.id,
      variantName: `${selectedBox.name} (${selectedFruits.length}/${selectedBox.capacity} 品果物)`,
      weight: '約 2.5~3.5kg',
      price: totalPrice,
      quantity: 1,
      image: selectedBox.image,
      isCustomGiftBox: true,
      giftBoxDetails: {
        boxTypeName: selectedBox.name,
        ribbonColorName: ribbonColor,
        cardMessage: cardMessage,
        selectedFruitNames: selectedFruitNames,
      },
    };

    onAddCustomGiftBox(customCartItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="gift-atelier" className="py-16 bg-[#F5F2EB] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <Gift className="w-4 h-4 text-emerald-700" />
            <span>Artisan Gift Hamper Atelier · 客製化禮盒工坊</span>
          </div>
          <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            手選頂級旬果 · 專屬尊榮獻禮
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            自由挑選盒型、當季空運鮮果、特製緞帶與客製心意祝賀卡。
            每一盒皆由果物侍酒師專屬襯墊包裝，全程冷藏配送。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Builder Steps */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Choose Box */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-tc text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#264134] text-white text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>選擇典雅禮盒型式</span>
                </h3>
                <span className="text-xs text-stone-500">容量上限視盒型而定</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GIFT_BOX_OPTIONS.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <button
                      key={box.id}
                      onClick={() => handleBoxChange(box)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#264134] ring-2 ring-[#264134]/10 bg-emerald-50/30'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-stone-900">{box.name}</span>
                          {box.isPopular && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                              熱門首選
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500 leading-normal mb-3">
                          {box.description}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-800">
                          可裝 {box.capacity} 品果物
                        </span>
                        <span className="font-mono font-bold text-stone-900">
                          +NT$ {box.basePrice}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pick Fruits */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-tc text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#264134] text-white text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>挑選旬果品項入盒 ({selectedFruits.length} / {selectedBox.capacity})</span>
                </h3>
                {selectedFruits.length >= selectedBox.capacity && (
                  <span className="text-xs font-medium text-emerald-800">已達格位上限</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FRUITS_FOR_GIFT_BOX.map((fruit) => {
                  const isFull = selectedFruits.length >= selectedBox.capacity;
                  return (
                    <div
                      key={fruit.id}
                      className="p-3 border border-stone-200 rounded-xl flex items-center justify-between bg-stone-50/50 hover:bg-stone-50 transition-colors"
                    >
                      <div>
                        <div className="text-xs font-semibold text-stone-900">{fruit.name}</div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                          <span>{fruit.origin}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-700 font-mono">糖度 {fruit.brix}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-800 tabular-nums">
                          +NT$ {fruit.price}
                        </span>
                        <button
                          disabled={isFull}
                          onClick={() => handleAddFruit(fruit.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isFull
                              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              : 'bg-[#264134] text-white hover:bg-[#1b2f25]'
                          }`}
                          title="放入禮盒格位"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Ribbon & Greeting Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif-tc text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#264134] text-white text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <span>包裝細節與客製心意卡</span>
              </h3>

              <div className="space-y-4">
                {/* Ribbon selector */}
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-2">
                    緞帶風格 (附免費手工蝴蝶結綁束)：
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ribbons.map((ribbon) => (
                      <button
                        key={ribbon.name}
                        onClick={() => setRibbonColor(ribbon.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                          ribbonColor === ribbon.name
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                            : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full border ${ribbon.colorClass}`} />
                        <span>{ribbon.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      專屬燙金祝賀卡印製內容 (免費)：
                    </label>
                    <span className="text-[11px] text-stone-400">限 60 字內</span>
                  </div>

                  <textarea
                    rows={2}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    maxLength={60}
                    placeholder="輸入給收禮人的溫暖問候..."
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-800"
                  />

                  {/* Preset Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {presetMessages.map((msg, i) => (
                      <button
                        key={i}
                        onClick={() => setCardMessage(msg)}
                        className="text-[11px] px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded transition-colors"
                      >
                        {msg.slice(0, 10)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Box Preview & Checkout Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <div className="text-xs text-stone-500">禮盒配置預覽</div>
                  <h4 className="font-serif-tc text-lg font-bold text-stone-900">
                    {selectedBox.name}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-400">當前配置總價</div>
                  <div className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                    NT$ {totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Slot Grid Representation */}
              <div>
                <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
                  <span>格位內容物配置：</span>
                  <span className="font-mono">{selectedFruits.length} / {selectedBox.capacity} 格已填滿</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {Array.from({ length: selectedBox.capacity }).map((_, idx) => {
                    const fruitId = selectedFruits[idx];
                    const fruit = fruitId ? FRUITS_FOR_GIFT_BOX.find((f) => f.id === fruitId) : null;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs min-h-[72px] flex flex-col justify-between transition-colors ${
                          fruit
                            ? 'bg-emerald-50/40 border-emerald-200/80 text-stone-900'
                            : 'bg-stone-50 border-dashed border-stone-300 text-stone-400 items-center justify-center'
                        }`}
                      >
                        {fruit ? (
                          <>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-semibold line-clamp-1 text-[11px]">{fruit.name}</span>
                              <button
                                onClick={() => handleRemoveFruit(idx)}
                                className="text-stone-400 hover:text-red-500 p-0.5 cursor-pointer"
                                title="移除此格果物"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono mt-1">
                              <span>{fruit.origin}</span>
                              <span className="font-bold text-stone-800">NT$ {fruit.price}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-1">
                            <span className="text-[11px]">格位 {idx + 1} 待選</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specs & Ribbon Card Preview */}
              <div className="bg-stone-50 p-3.5 rounded-xl text-xs space-y-2 border border-stone-200/60">
                <div className="flex items-center justify-between text-stone-600">
                  <span>指定緞帶：</span>
                  <span className="font-medium text-stone-800">{ribbonColor}</span>
                </div>
                <div className="pt-2 border-t border-stone-200/50">
                  <span className="text-stone-500 text-[11px] block mb-1">心意卡印製預覽：</span>
                  <p className="font-serif-tc text-stone-700 italic text-[11px] bg-white p-2 rounded border border-stone-200">
                    "{cardMessage || '（未填寫祝福語）'}"
                  </p>
                </div>
              </div>

              {/* Add Custom Gift Box to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={selectedFruits.length === 0}
                className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : selectedFruits.length === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#264134] hover:bg-[#1b2f25] text-stone-50'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>專屬客製禮盒已加入購物籃！</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>完成客製並加入購物籃 · NT$ {totalPrice.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-stone-400">
                每盒附贈品牌提袋 · 黑貓低溫冷藏宅急便配送
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
