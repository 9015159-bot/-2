import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      {/* Promotional Notice Banner - Clean, single row */}
      <div className="bg-[#264134] text-stone-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">黑貓低溫冷藏直送 · 全館消費滿 NT$1,500 享免運到府</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-stone-300">
            <span>糖度紅外線檢測標準</span>
            <span aria-hidden="true">·</span>
            <span>48小時果損安心保證</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar - Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer"
          >
            <div className="font-serif-tc text-2xl font-bold tracking-tight text-stone-900 group-hover:text-[#264134] transition-colors">
              果嶼良品
            </div>
            <div className="text-[10px] tracking-widest text-stone-500 uppercase font-sans -mt-0.5">
              FRUIT ISLE · ARTISAN ORCHARD
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Navigation Links (single-line, clean text with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigateSection('products')}
            className="hover:text-[#264134] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            旬果選物
          </button>
          <button
            onClick={() => onNavigateSection('gift-atelier')}
            className="hover:text-[#264134] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            客製禮盒工坊
          </button>
          <button
            onClick={() => onNavigateSection('seasonal-guide')}
            className="hover:text-[#264134] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            旬果曆與甜度
          </button>
          <button
            onClick={() => onNavigateSection('origin-story')}
            className="hover:text-[#264134] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            產地嚴選安心
          </button>
          <button
            onClick={() => onNavigateSection('reviews')}
            className="hover:text-[#264134] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            老饕鑑賞評價
          </button>
        </nav>

        {/* Zone 3: Primary Action & Affordances */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="搜尋果物或產地..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-48 text-xs bg-transparent focus:outline-none text-stone-900"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 ml-1 p-0.5"
                  aria-label="關閉搜尋"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                title="搜尋果物"
                aria-label="搜尋果物"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="查看收藏果物"
            aria-label="查看收藏果物"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#264134] hover:bg-[#1b2f25] text-stone-50 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm"
            aria-label="購物車"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">購物籃</span>
            <span className="bg-emerald-950/40 text-emerald-100 text-xs px-1.5 py-0.5 rounded font-mono tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 md:hidden hover:bg-stone-100 rounded-lg"
            aria-label="開啟選單"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 py-4 space-y-3">
          <button
            onClick={() => {
              onNavigateSection('products');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-800 text-sm font-medium"
          >
            旬果選物
          </button>
          <button
            onClick={() => {
              onNavigateSection('gift-atelier');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-800 text-sm font-medium"
          >
            客製禮盒工坊
          </button>
          <button
            onClick={() => {
              onNavigateSection('seasonal-guide');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-800 text-sm font-medium"
          >
            旬果曆與甜度
          </button>
          <button
            onClick={() => {
              onNavigateSection('origin-story');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-800 text-sm font-medium"
          >
            產地嚴選安心
          </button>
          <button
            onClick={() => {
              onNavigateSection('reviews');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-800 text-sm font-medium"
          >
            老饕鑑賞評價
          </button>
        </div>
      )}
    </header>
  );
};
