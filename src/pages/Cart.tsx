
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import BackButton from '@/components/BackButton';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import CouponInput from '@/components/CouponInput';
import { useOrder } from '@/context/OrderContext';

const Cart = () => {
  const { items, address } = useOrder();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 bg-white border-b flex items-center">
          <BackButton to="/" />
          <h1 className="text-xl font-bold flex-1 text-center">Carrinho</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg mb-4">Seu carrinho está vazio</p>
          <Link to="/" className="bg-primary text-white px-6 py-2 rounded-md">
            Voltar para o menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center">
        <BackButton to="/" />
        <h1 className="text-xl font-bold flex-1 text-center">Carrinho</h1>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Endereço */}
        <Link 
          to="/address" 
          className={`flex items-center p-4 mb-6 rounded-md ${address ? 'bg-gray-200' : 'bg-primary'}`}
        >
          <MapPin className={`h-5 w-5 mr-2 ${address ? 'text-gray-700' : 'text-white'}`} />
          <div className={`flex-1 text-left ${address ? 'text-gray-700' : 'text-white'}`}>
            <div className="font-medium">Delivery para</div>
            {address ? (
              <div className="text-sm">
                {address.street}, {address.number}, {address.complement || ''}
              </div>
            ) : (
              <div className="text-sm">Adicionar endereço de entrega</div>
            )}
          </div>
          {address && (
            <svg 
              className="w-5 h-5 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          )}
        </Link>

        {/* Cart Items */}
        <div className="flex-1">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cupom */}
        <CouponInput />

        {/* Order Summary */}
        <OrderSummary />
      </div>

      {/* Continue Button */}
      <div className="p-4 bg-white border-t">
        <Link
          to={address ? "/payment" : "/address"}
          className="block w-full bg-primary text-white py-3 rounded-md text-center font-medium"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
};

export default Cart;
