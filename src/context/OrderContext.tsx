
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, OrderSummary, DeliveryAddress, PaymentMethod, OrderState } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

interface OrderContextType {
  items: CartItem[];
  address: DeliveryAddress | null;
  paymentMethod: PaymentMethod | null;
  couponCode: string;
  summary: OrderSummary;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  setAddress: (address: DeliveryAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  applyCoupon: (code: string) => void;
  clearCart: () => void;
  resetOrder: () => void;
}

const initialSummary: OrderSummary = {
  subtotal: 0,
  delivery: 10,
  discount: 0,
  total: 0,
};

const initialState: OrderState = {
  items: [],
  address: null,
  paymentMethod: null,
  couponCode: '',
  summary: initialSummary,
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<DeliveryAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [summary, setSummary] = useState<OrderSummary>(initialSummary);
  const { toast } = useToast();

  // Carregar do localStorage na renderização inicial
  useEffect(() => {
    const savedOrder = localStorage.getItem('orderState');
    if (savedOrder) {
      const parsedOrder: OrderState = JSON.parse(savedOrder);
      setItems(parsedOrder.items);
      setAddress(parsedOrder.address);
      setPaymentMethod(parsedOrder.paymentMethod);
      setCouponCode(parsedOrder.couponCode);
      setSummary(parsedOrder.summary);
    }
  }, []);

  // Salvar no localStorage sempre que o estado mudar
  useEffect(() => {
    const orderState: OrderState = {
      items,
      address,
      paymentMethod,
      couponCode,
      summary,
    };
    localStorage.setItem('orderState', JSON.stringify(orderState));
  }, [items, address, paymentMethod, couponCode, summary]);

  // Atualizar resumo sempre que itens ou cupons forem alterados
  useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = couponCode === 'DESCONTO20' ? subtotal * 0.2 : 0;
    const delivery = address?.pickup ? 0 : 10;
    const total = subtotal + delivery - discount;

    setSummary({
      subtotal,
      delivery,
      discount,
      total,
    });
  }, [items, couponCode, address]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
    toast({
      title: "Item adicionado",
      description: `${item.name} foi adicionado ao carrinho`,
    });
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const applyCoupon = (code: string) => {
    if (code === 'DESCONTO20') {
      setCouponCode(code);
      toast({
        title: "Cupom aplicado",
        description: "Desconto de 20% aplicado",
      });
    } else {
      toast({
        title: "Cupom inválido",
        description: "Este cupom não existe",
        variant: "destructive",
      });
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetOrder = () => {
    setItems([]);
    setAddress(null);
    setPaymentMethod(null);
    setCouponCode('');
    setSummary(initialSummary);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        address,
        paymentMethod,
        couponCode,
        summary,
        addItem,
        removeItem,
        updateQuantity,
        setAddress,
        setPaymentMethod,
        applyCoupon,
        clearCart,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
