import React from 'react';
import { REVIEWS } from '../data/fruits';
import { ShieldCheck, Truck, Leaf, Star, CheckCircle2, HeartHandshake } from 'lucide-react';

export const FarmDirectStory: React.FC = () => {
  return (
    <section id="origin-story" className="py-16 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Origin & Quality Assurances */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Farm-to-Table Trust · 產地履歷與安心保證
            </div>
            <h2 className="font-serif-tc text-3xl font-bold text-stone-900 mt-2">
              堅持親赴產地 · 每顆果實都值得被溫柔對待
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              我們深入長野山岳果園、屏東向陽斜坡與梨山雲霧梯田，
              與堅持自然熟成的老農簽訂長期契作，確保土地與農人獲得合理的尊嚴回報。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-lg font-bold text-stone-900">
                契作友善耕作
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                絕不施用生長激素或早採人工催熟。尊重天然掛樹天數，讓果實累積充足糖度與香氣，才進行人工剪採。
              </p>
              <div className="pt-2 text-[11px] text-stone-400 font-mono">
                SGS 410項農藥殘留零檢出
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-lg font-bold text-stone-900">
                全程冷鏈直送到府
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                採收後 2 小時內移入預冷庫降溫，配合黑貓低溫專車 3~5°C 恆溫配送，免除常溫日曬變質風險。
              </p>
              <div className="pt-2 text-[11px] text-stone-400 font-mono">
                全台本島黑貓低溫配送
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-lg font-bold text-stone-900">
                48小時果損安心換
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                鮮果運送難免偶有碰撞，若收到商品有任何碰撞壓傷或瑕疵，只需拍照回傳，客服專人 24 小時內補寄或退款。
              </p>
              <div className="pt-2 text-[11px] text-stone-400 font-mono">
                100% 滿意度承諾保障
              </div>
            </div>
          </div>
        </div>

        {/* Section: Reviews / Attributable Testimonials */}
        <div id="reviews" className="pt-8 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Verified Reviews · 老饕與企業鑑賞評價
            </div>
            <h3 className="font-serif-tc text-2xl font-bold text-stone-900 mt-1">
              真實顧客品嚐體驗反饋
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Star rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900">{review.author}</span>
                    <span className="text-[11px] text-stone-400 font-mono">{review.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>已驗證購買：{review.fruitPurchased}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
