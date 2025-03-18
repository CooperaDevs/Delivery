
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  pickup: boolean;
}

export type PaymentMethod = 'pix' | 'card' | 'cash';

export interface OrderState {
  items: CartItem[];
  address: DeliveryAddress | null;
  paymentMethod: PaymentMethod | null;
  couponCode: string;
  summary: OrderSummary;
}
