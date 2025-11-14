export interface ProductVariant {
  size: string;
  price: number;
  originalPrice?: number;
}

export interface BaseProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface SimpleProduct extends BaseProduct {
  price: number;
  originalPrice?: number;
}

export interface VariantProduct extends BaseProduct {
  variants: ProductVariant[];
}

export type Product = SimpleProduct | VariantProduct;

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

// FIX: Add CartItem interface to resolve import error in Cart.tsx.
export interface CartItem extends OrderItem {
  imageUrl: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  wilaya: string;
  deliveryMethod: 'home' | 'office';
  items: OrderItem[];
  total: number;
}

// FIX: Add ChatMessage interface to resolve import error in SafetyChatbot.tsx.
export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
