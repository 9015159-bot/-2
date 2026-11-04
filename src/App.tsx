import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/fruits';
import { Product, ProductVariant, CartItem, CustomerOrder } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GiftBoxBuilder } from './components/GiftBoxBuilder';
import { SeasonalCalendar } from './components/SeasonalCalendar';
import { FarmDirectStory } from './components/FarmDirectStory';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { Check, Heart } from 'lucide-react';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fruit_isle_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default starter item
    return [
      {
        cartId: 'default-cart-item-1',
        productId: 'shine-muscat',
        productName: '日本長野 · 信州特選晴王麝香葡萄',
        variantId: 'muscat-single',
        variantName: '單穗木紋典藏盒 (約650g)',
        weight: '650g',
        price: 1380,
        quantity: 1,
        image: PRODUCTS[0].image,
      },
    ];
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fruit_isle_favs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['shine-muscat', 'irwin-mango'];
  });

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<{ code: string; amount: number }>({ code: '', amount: 0 });
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('fruit_isle_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('fruit_isle_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      showToast('已從心願清單移除');
    } else {
      setFavorites([...favorites, productId]);
      showToast('已加入心願清單');
    }
  };

  // Add to cart from PDP
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.variantId === variant.id && !item.isCustomGiftBox
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantName: variant.name,
        weight: variant.weight,
        price: variant.price,
        quantity: quantity,
        image: product.image,
      };
      setCartItems([...cartItems, newItem]);
    }
    showToast(`已將 ${quantity} 件「${product.name.split('·')[0].trim()}」加入購物籃`);
  };

  // Quick add from catalog
  const handleQuickAddToCart = (product: Product) => {
    const defaultVariant = product.variants[0];
    handleAddToCart(product, defaultVariant, 1);
  };

  // Add custom gift box
  const handleAddCustomGiftBox = (customItem: CartItem) => {
    setCartItems([...cartItems, customItem]);
    showToast('客製原木禮盒已成功加入購物籃');
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.cartId !== cartId));
    } else {
      setCartItems(
        cartItems.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
      );
    }
  };

  // Remove item
  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  // Open checkout from cart drawer
  const handleOpenCheckout = (code: string, amount: number) => {
    setDiscountInfo({ code, amount });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order success
  const handleOrderSuccess = (order: CustomerOrder) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart
  };

  // Scroll to section
  const handleNavigateSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#264134] text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Storefront Hero */}
        <Hero
          onExploreProducts={() => handleNavigateSection('products')}
          onOpenGiftAtelier={() => handleNavigateSection('gift-atelier')}
        />

        {/* Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAddToCart={handleQuickAddToCart}
          searchQuery={searchQuery}
        />

        {/* Custom Gift Box Atelier */}
        <GiftBoxBuilder onAddCustomGiftBox={handleAddCustomGiftBox} />

        {/* Seasonal Harvest Calendar & Brix Sweetness Guide */}
        <SeasonalCalendar />

        {/* Farm Direct Origin & Quality Guarantee & Reviews */}
        <FarmDirectStory />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Slide-over Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={PRODUCTS}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleQuickAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountCode={discountInfo.code}
        discountAmount={discountInfo.amount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success & Cold-Chain Tracking Modal */}
      <OrderSuccessModal
        order={completedOrder}
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}
