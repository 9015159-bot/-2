import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Gift, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, qty: number) => void;
  onRemoveItem: (cartId: string) => void;
  onOpenCheckout: (discountCode: string, discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedVoucher ? appliedVoucher.discount : 0;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 180;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherInput.trim().toUpperCase();
    if (code === 'FRUIT100' || code === 'WELCOME100') {
      setAppliedVoucher({ code, discount: 100 });
      setVoucherInput('');
    } else if (code === 'VIP200' && subtotal >= 2000) {
      setAppliedVoucher({ code, discount: 200 });
      setVoucherInput('');
    } else {
      setVoucherError('無效的折扣碼，試試輸入「WELCOME100」');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif-tc text-lg font-bold text-stone-900">
                專屬選物購物籃
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-medium">
                {items.length} 件
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="關閉購物車"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100 text-xs">
            <div className="flex items-center justify-between text-emerald-900 font-medium mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>
                  {amountToFreeShipping === 0
                    ? '🎉 已達黑貓冷藏免運門檻！'
                    : `還差 NT$ ${amountToFreeShipping.toLocaleString()} 即可享黑貓免運`}
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-700">滿 NT$1,500</span>
            </div>
            <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-700 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <div className="font-serif-tc text-base font-semibold text-stone-700">
                  購物籃目前是空的
                </div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  探索當季現採鮮果或客製原木禮盒，把最新鮮的甘美帶回家。
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-[#264134] text-white text-xs font-medium rounded-lg hover:bg-[#1b2f25] transition-colors cursor-pointer"
                >
                  前往選購果物
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartId} className="pt-4 first:pt-0 flex gap-3.5">
                  <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.image}
                      alt={item.productName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-tc text-xs sm:text-sm font-semibold text-stone-900 leading-tight">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          aria-label="移除品項"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.variantName}
                      </div>

                      {/* If custom gift box, display extra details */}
                      {item.isCustomGiftBox && item.giftBoxDetails && (
                        <div className="mt-1.5 p-2 bg-stone-50 rounded border border-stone-200 text-[10px] text-stone-600 space-y-1">
                          <div className="flex items-center gap-1 font-medium text-emerald-900">
                            <Gift className="w-3 h-3" />
                            <span>客製果品 ({item.giftBoxDetails.selectedFruitNames.length} 品)</span>
                          </div>
                          <div className="text-stone-500 truncate">
                            {item.giftBoxDetails.selectedFruitNames.join('、')}
                          </div>
                          <div className="text-stone-400">
                            緞帶：{item.giftBoxDetails.ribbonColorName}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="減少"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="增加"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                        NT$ {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/70 space-y-4">
              {/* Voucher Code Form */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="輸入優惠代碼 (例: WELCOME100)"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    套用
                  </button>
                </div>
                {appliedVoucher && (
                  <div className="text-[11px] text-emerald-800 flex items-center justify-between">
                    <span>已套用優惠碼「{appliedVoucher.code}」折抵 NT$ {appliedVoucher.discount}</span>
                    <button
                      onClick={() => setAppliedVoucher(null)}
                      className="text-stone-400 hover:text-red-500 text-[10px]"
                    >
                      移除
                    </button>
                  </div>
                )}
                {voucherError && (
                  <div className="text-[11px] text-red-500">{voucherError}</div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/60 pt-3">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span className="font-mono tabular-nums">NT$ {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>活動優惠折抵</span>
                    <span className="font-mono tabular-nums">- NT$ {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>黑貓低溫冷鏈運費</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-800 font-medium">免運費</span>
                    ) : (
                      `NT$ ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>預估結帳總額</span>
                  <span className="font-mono tabular-nums text-lg text-[#264134]">
                    NT$ {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onOpenCheckout(appliedVoucher ? appliedVoucher.code : '', discount)}
                className="w-full py-3.5 px-4 bg-[#264134] hover:bg-[#1b2f25] text-stone-50 font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>前往結帳確認</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
