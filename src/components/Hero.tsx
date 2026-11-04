import React from 'react';
import { Sparkles, ArrowRight, Truck, Award, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data/fruits';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenGiftAtelier: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onOpenGiftAtelier }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column - 7 cols on lg */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>2026 旬時果物 · 晨採直送</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500 normal-case font-normal">日本長野與屏東在地契作</span>
            </div>

            <h1 className="font-serif-tc text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              採摘當季最純粹的甘甜，
              <br />
              <span className="text-[#264134]">把陽光熟成的滋味</span>直送餐桌
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              每一顆果物皆經過糖度光波檢驗，保留清晨枝頭的最佳風味。
              從日本長野信州晴王麝香葡萄，到屏東枋山落山風在欉紅愛文芒果，
              讓最細緻多汁的奢華口感，成為日常與節慶最珍貴的心意。
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#264134] hover:bg-[#1b2f25] text-stone-50 font-medium rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>探索當季盛產旬果</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenGiftAtelier}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>客製化原木果物禮盒</span>
              </button>
            </div>

            {/* Three key trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 text-stone-700">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-stone-900">Brix 糖度保證</div>
                  <div className="text-xs text-stone-500 mt-0.5">光波儀逐顆篩選 達標才出貨</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-stone-900">黑貓低溫冷鏈</div>
                  <div className="text-xs text-stone-500 mt-0.5">3~5°C 溫控鎖住水潤與鮮脆</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-stone-900">48H 安心果損換</div>
                  <div className="text-xs text-stone-500 mt-0.5">瑕疵無條件補寄或退款</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Anchor - 5 cols on lg */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-xl bg-white aspect-[4/3] lg:aspect-[4/3] group">
              <img
                src={HERO_IMAGE}
                alt="果嶼良品當季特選頂級鮮果總匯"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent pointer-events-none" />

              {/* Quiet overlay caption badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-stone-900">長野信州 · 特選晴王與山梨蜜桃</div>
                  <div className="text-[11px] text-stone-500">空運冷藏抵台 · 糖度認證 18°+</div>
                </div>
                <span className="text-xs font-semibold text-emerald-800">
                  當令盛產中
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
