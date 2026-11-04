import React from 'react';
import { CheckCircle2, Truck, Package, Calendar, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { CustomerOrder } from '../types';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Success Banner */}
        <div className="bg-[#264134] text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-700/60 text-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-200" />
          </div>
          <h2 className="font-serif-tc text-2xl font-bold tracking-tight">
            感謝您的訂購！果物訂單已正式成立
          </h2>
          <div className="font-mono text-xs text-emerald-200 tracking-wider">
            訂單編號：{order.orderNumber} · 訂單日期：{order.orderDate}
          </div>
        </div>

        {/* Cold-Chain Dispatch Timeline */}
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <div className="text-xs font-semibold text-stone-700 mb-3 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-800" />
            <span>黑貓低溫冷鏈直送進度 (全程 3~5°C)</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className="bg-white p-2.5 rounded-lg border border-emerald-300 shadow-xs">
              <div className="font-bold text-emerald-800">1. 已接單</div>
              <div className="text-stone-400 text-[10px] mt-0.5">系統排程排單</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-700">2. 晨間精選</div>
              <div className="text-stone-400 text-[10px] mt-0.5">光波糖度篩檢</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-700">3. 冷鏈封箱</div>
              <div className="text-stone-400 text-[10px] mt-0.5">防撞襯墊保鮮</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-700">4. 專車配送</div>
              <div className="text-stone-400 text-[10px] mt-0.5">{order.deliveryDate.slice(0, 4)}</div>
            </div>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto text-xs">
          {/* Shipping & Recipient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-400 text-[11px] block">收件人</span>
              <span className="font-semibold text-stone-800 text-sm">{order.customerName}</span>
              <span className="text-stone-500 font-mono text-[11px] block mt-0.5">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">預計到府時間</span>
              <span className="font-semibold text-stone-800">{order.deliveryDate}</span>
              <span className="text-stone-500 text-[11px] block mt-0.5">{order.deliveryTimeSlot}</span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-stone-100">
              <span className="text-stone-400 text-[11px] block">配送地址</span>
              <span className="text-stone-800 font-medium">{order.recipientAddress}</span>
            </div>
            <div className="sm:col-span-2 pt-1">
              <span className="text-stone-400 text-[11px] block">付款方式</span>
              <span className="text-stone-800 font-medium">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="font-semibold text-stone-800 mb-2">訂購果物明細</h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-10 h-10 object-cover rounded-md border border-stone-200"
                    />
                    <div>
                      <div className="font-semibold text-stone-900">{item.productName}</div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {item.variantName} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-stone-900 tabular-nums">
                    NT$ {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-stone-50 p-4 rounded-xl space-y-1.5 border border-stone-200">
            <div className="flex justify-between text-stone-600">
              <span>商品總計</span>
              <span className="font-mono">NT$ {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>活動折扣</span>
                <span className="font-mono">- NT$ {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>黑貓低溫冷藏運費</span>
              <span className="font-mono">
                {order.shippingFee === 0 ? '免運' : `NT$ ${order.shippingFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
              <span>實付總額</span>
              <span className="font-mono text-emerald-900 text-base">
                NT$ {order.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>享有果嶼良品 48 小時果損安心更換保證，我們已將訂單明細同步寄送至您的電子信箱。</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-900 text-xs font-medium rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>列印訂購收據</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#264134] hover:bg-[#1b2f25] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            完成並返回官網
          </button>
        </div>
      </div>
    </div>
  );
};
