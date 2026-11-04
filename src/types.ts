export type FruitCategory = 'all' | 'season' | 'import' | 'direct' | 'gift';

export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  englishName: string;
  category: FruitCategory;
  origin: string;
  originRegion: string;
  brix: number; // Brix sweetness degrees e.g. 18.5
  sweetnessLabel: string; // e.g. "蜜香濃郁"
  season: string; // e.g. "秋旬限定"
  harvestDate: string;
  image: string;
  badge?: string; // e.g. "空運首批" | "產銷履歷" | "人氣熱銷"
  description: string;
  farmerNote: string;
  specs: string;
  storageTip: string;
  shelfLife: string;
  flavorProfile: {
    sweetness: number; // 1-5
    acidity: number;   // 1-5
    aroma: number;     // 1-5
    crispness: number; // 1-5
  };
  variants: ProductVariant[];
  inStock: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  isCustomGiftBox?: boolean;
  giftBoxDetails?: {
    boxTypeName: string;
    ribbonColorName: string;
    cardMessage: string;
    selectedFruitNames: string[];
  };
}

export interface CustomerOrder {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  recipientAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  packagingPreference: string;
  paymentMethod: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  fruitPurchased: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}
