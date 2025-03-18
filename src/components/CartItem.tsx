
import { Plus, Minus, X } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { CartItem as CartItemType } from '@/types/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useOrder();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center mb-4 py-4 border-b">
      <button onClick={handleRemove} className="mr-2">
        <X className="h-5 w-5 text-gray-400" />
      </button>
      
      <img 
        src={item.image} 
        alt={item.name} 
        className="h-16 w-16 object-cover rounded-md mr-4"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-left">{item.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <button onClick={handleDecrease} className="quantity-button">
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-3">{item.quantity}</span>
            <button onClick={handleIncrease} className="quantity-button">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
