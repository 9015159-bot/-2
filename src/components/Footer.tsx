import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Truck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="font-serif-tc text-2xl font-bold tracking-tight text-white">
                果嶼良品
              </div>
              <div className="text-[10px] tracking-widest text-stone-400 uppercase font-sans mt-0.5">
                FRUIT ISLE · ARTISAN ORCHARD CO.
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              致力於將台灣與全球頂級產地的旬味鮮果，以最高標準的糖度光波檢驗與全程冷鏈專車，原汁原味地送到您的手中。
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SGS 農業安全殘留 410 項檢驗合格認證</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              果物導覽
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  當季盛產旬果
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('gift-atelier')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  客製化原木禮盒
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('seasonal-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  四季果曆與 Brix 甜度
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('origin-story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  產地履歷與安心保證
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  顧客鑑賞真實評價
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Cold-Chain */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              配送與售後
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>黑貓低溫冷鏈 3~5°C 直送</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>48 小時果損安心補寄退款</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>今日 16:00 前下單明日出貨</span>
              </li>
              <li>滿 NT$1,500 享本島免運</li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              門市與客服
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>台北市大安區敦化南路一段 288 號 1 樓</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-mono">02-2784-9988</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-mono">service@fruitisle.tw</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                服務時間：週一至週日 09:30 - 20:30
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © 2026 果嶼良品 FRUIT ISLE CO. 保留一切權利 · 旬味果物專賣
          </div>
          <div className="flex items-center gap-6">
            <span>隱私權政策</span>
            <span>服務條款</span>
            <span>食品業者登錄字號 A-12849988-00000-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
