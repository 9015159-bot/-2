import React, { useState } from 'react';
import { SEASONAL_GUIDE } from '../data/fruits';
import { Calendar, Sun, Snowflake, Flower2, Leaf, Sparkles, HelpCircle } from 'lucide-react';

export const SeasonalCalendar: React.FC = () => {
  const [activeSeasonIdx, setActiveSeasonIdx] = useState(2); // Default autumn

  const seasonIcons = [Flower2, Sun, Leaf, Snowflake];

  const brixLevels = [
    {
      range: '12° ~ 14° Brix',
      tag: '清新爽脆 · 潤喉解渴',
      desc: '口感清冽微甜，果肉水分最充足，甜而不膩。',
      examples: '梨山雪梨、屏東黑珍珠蓮霧、早春芭樂',
      badgeColor: 'text-sky-800 bg-sky-50 border-sky-200',
    },
    {
      range: '15° ~ 16.5° Brix',
      tag: '甘潤勻稱 · 芳香優雅',
      desc: '酸甜黃金平衡，果汁豐富，香氣開始展現層次。',
      examples: '日本佐賀草莓、靜岡阿露斯蜜瓜、川中島白桃',
      badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    },
    {
      range: '17° ~ 18.5° Brix',
      tag: '蜜香濃醇 · 軟嫩多汁',
      desc: '達到天然糖分結晶熟成，濃甜無纖維，入口即化。',
      examples: '枋山落山風愛文芒果、智利 3J 黑櫻桃、大樹玉荷包',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      range: '19°+ Brix 蜜極品',
      tag: '極致爆甜 · 珠玉瓊漿',
      desc: '世界級稀有甜度巔峰，每一口皆如蜜糖融化般震撼。',
      examples: '長野信州晴王麝香葡萄、台東頂級大目釋迦',
      badgeColor: 'text-rose-800 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <section id="seasonal-guide" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Seasonal Harvest & Brix Guide · 旬食專欄
        </div>
        <h2 className="font-serif-tc text-3xl font-bold text-stone-900 mt-1">
          看懂時序旬果 · 解密 Brix 光波甜度
        </h2>
        <p className="text-stone-600 text-sm mt-3 leading-relaxed">
          順應大自然節氣品嚐當時當令最新鮮的果物，並認識國際果物糖度標準，挑選最適合自己或長輩喜好的甘甜。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Seasonal Harvest Calendar (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-800" />
              <h3 className="font-serif-tc text-lg font-bold text-stone-900">
                四季旬果採收曆
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">2026 最新產候</span>
          </div>

          {/* Season Tabs */}
          <div className="grid grid-cols-4 gap-2 bg-stone-100 p-1 rounded-xl">
            {SEASONAL_GUIDE.map((sg, idx) => {
              const Icon = seasonIcons[idx];
              const isActive = activeSeasonIdx === idx;
              return (
                <button
                  key={sg.season}
                  onClick={() => setActiveSeasonIdx(idx)}
                  className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-sm font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{sg.season.slice(0, 2)}</span>
                </button>
              );
            })}
          </div>

          {/* Active Season Detail */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-serif-tc text-base font-bold text-stone-900">
                {SEASONAL_GUIDE[activeSeasonIdx].season}
              </span>
              <span className="text-xs text-emerald-800 font-medium">
                {SEASONAL_GUIDE[activeSeasonIdx].title}
              </span>
            </div>

            <div className="space-y-2.5">
              {SEASONAL_GUIDE[activeSeasonIdx].fruits.map((fruit, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs hover:bg-stone-100/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-stone-900">{fruit.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{fruit.note}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                      糖度 {fruit.brix}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-stone-400 italic pt-2">
              註：氣候與降雨可能使實際收成期提早或延後 1~2 週，果嶼良品維持每週現場探勘品質。
            </p>
          </div>
        </div>

        {/* Right Column: Brix Sweetness Scale (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif-tc text-lg font-bold text-stone-900">
                Brix 糖度標準指引
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-500">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>光波非破壞性檢測</span>
            </div>
          </div>

          <div className="space-y-3">
            {brixLevels.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors bg-white space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-stone-900">
                      {b.range}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${b.badgeColor}`}>
                      {b.tag}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {b.desc}
                </p>
                <div className="text-[11px] text-stone-400">
                  常見代表：{b.examples}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="font-semibold text-stone-900">果嶼良品嚴選原則</div>
            <p className="text-[11px] leading-relaxed">
              甜度僅是品質的一環，完美的果品還講求脆度、水分飽滿感與天然酸度帶來的層次回甘。我們為您把關最高標準的甘純享受。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
