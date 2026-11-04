import React, { useState } from 'react';
import { X, CreditCard, Banknote, ShieldCheck, Calendar, Clock, MapPin, Truck } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('王曉峰');
  const [phone, setPhone] = useState('0912-345-678');
  const [email, setEmail] = useState('user@example.com');
  const [city, setCity] = useState('台北市');
  const [district, setDistrict] = useState('大安區');
  const [address, setAddress] = useState('仁愛路四段 120 號 8 樓');
  const [deliveryDate, setDeliveryDate] = useState('明日晨間配送 (最快抵達)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('13:00 前抵達 (適合辦公室/晨間)');
  const [packagingPreference, setPackagingPreference] = useState('尊榮原木提盒附贈品牌提袋');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'line_pay' | 'cod' | 'atm'>('credit_card');
  const [notes, setNotes] = useState('若不在家請請大樓管理室代為置於冷藏冰箱，謝謝！');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 1500 ? 0 : 180;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `FISLE-${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
      const newOrder: CustomerOrder = {
        orderId: `order-${Date.now()}`,
        orderNumber: orderNumber,
        orderDate: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: finalTotal,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        recipientAddress: `${city}${district}${address}`,
        deliveryDate,
        deliveryTimeSlot,
        packagingPreference,
        paymentMethod:
          paymentMethod === 'credit_card'
            ? '線上信用卡一次付清'
            : paymentMethod === 'line_pay'
            ? 'LINE Pay 行動支付'
            : paymentMethod === 'cod'
            ? '黑貓低溫貨到付款 (現金)'
            : 'ATM 虛擬帳號轉帳',
        notes,
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif-tc text-lg font-bold text-stone-900">
              果嶼良品 · 低溫冷藏直送結帳確認
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              請填寫收件與冷鏈配送資訊，我們將在晨間為您揀選鮮採果物出貨。
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="關閉結帳"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Customer Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#264134] text-white text-[10px] flex items-center justify-center font-mono">
                1
              </span>
              <span>訂購人與收件資訊</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  收件人姓名 *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  聯絡手機 (黑貓送達通知) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  電子信箱 (發送電子發票與出貨通知) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address & Time Slot */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#264134] text-white text-[10px] flex items-center justify-center font-mono">
                2
              </span>
              <span>黑貓低溫冷藏配送設定</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  縣市
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="台北市">台北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="新竹市">新竹市/縣</option>
                  <option value="台中市">台中市</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  市轄區 / 鄉鎮
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  詳細收件地址 (含樓層/門牌) *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  指定配送時程
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="明日晨間配送 (最快抵達)">明日晨間鮮採出貨 (最推薦)</option>
                  <option value="後日低溫配送">後日配送</option>
                  <option value="週末指定到府">指定本週末到府</option>
                  <option value="下週一上班日送達">下週一送達 (公司送禮)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  指定配送時段
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="13:00 前抵達 (適合辦公室/晨間)">13:00 前 (晨間時段)</option>
                  <option value="14:00 - 18:00 (午後時段)">14:00 - 18:00 (午後時段)</option>
                  <option value="不指定時段 (依宅配路線)">不指定時段 (司機彈性安排)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#264134] text-white text-[10px] flex items-center justify-center font-mono">
                3
              </span>
              <span>付款方式選擇</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#264134] bg-emerald-50/40 text-stone-900 font-semibold shadow-sm'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-800" />
                  <span>線上信用卡 (一次付清)</span>
                </div>
                <span className="text-[10px] text-stone-400">免手續費</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('line_pay')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'line_pay'
                    ? 'border-[#264134] bg-emerald-50/40 text-stone-900 font-semibold shadow-sm'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#00C300] text-white font-bold text-[9px] flex items-center justify-center">
                    L
                  </span>
                  <span>LINE Pay 行動支付</span>
                </div>
                <span className="text-[10px] text-stone-400">點數回饋</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-[#264134] bg-emerald-50/40 text-stone-900 font-semibold shadow-sm'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  <span>黑貓低溫貨到付款 (現金)</span>
                </div>
                <span className="text-[10px] text-stone-400">收貨再付款</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('atm')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'atm'
                    ? 'border-[#264134] bg-emerald-50/40 text-stone-900 font-semibold shadow-sm'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-700">ATM</span>
                  <span>虛擬帳號轉帳</span>
                </div>
                <span className="text-[10px] text-stone-400">各家銀行</span>
              </button>
            </div>
          </div>

          {/* Section 4: Special Note */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-stone-700 mb-1">
              訂單備註 / 送禮留言指示 (選填)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="例：請司機送達前先電話聯繫、代收冷藏..."
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* Order Summary & Final Submit */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>商品品項 ({items.length} 件)</span>
              <span className="font-mono">NT$ {subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>優惠代碼折抵 ({discountCode})</span>
                <span className="font-mono">- NT$ {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>黑貓低溫冷藏運費</span>
              <span className="font-mono">
                {shippingFee === 0 ? '免運費' : `NT$ ${shippingFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm">
              <span>結帳總額 (含稅)</span>
              <span className="font-mono text-xl text-[#264134] tabular-nums">
                NT$ {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#264134] hover:bg-[#1b2f25] text-stone-50 font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {isSubmitting ? (
              <span>正在建立冷鏈配送訂單...</span>
            ) : (
              <span>確認送出訂單 · NT$ {finalTotal.toLocaleString()}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
