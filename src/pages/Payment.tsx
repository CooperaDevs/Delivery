
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Banknote } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useOrder } from '@/context/OrderContext';
import { PaymentMethod } from '@/types/types';

const Payment = () => {
  const navigate = useNavigate();
  const { setPaymentMethod } = useOrder();

  const handleSelectPayment = (method: PaymentMethod) => {
    setPaymentMethod(method);
    navigate(`/payment/${method}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center">
        <BackButton to="/cart" />
        <h1 className="text-xl font-bold flex-1 text-center">Formas de Pagamento</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-4">
          <button
            onClick={() => handleSelectPayment('pix')}
            className="payment-option w-full text-left"
          >
            <div className="flex items-center w-full">
              <div className="w-10 h-10 flex items-center justify-center mr-4 text-teal-500">
                <QrCode className="h-6 w-6" />
              </div>
              <span className="font-medium">PIX</span>
            </div>
          </button>

          <button
            onClick={() => handleSelectPayment('cash')}
            className="payment-option w-full text-left"
          >
            <div className="flex items-center w-full">
              <div className="w-10 h-10 flex items-center justify-center mr-4 text-green-500">
                <Banknote className="h-6 w-6" />
              </div>
              <span className="font-medium">Dinheiro</span>
            </div>
          </button>

          <button
            onClick={() => handleSelectPayment('card')}
            className="payment-option w-full text-left"
          >
            <div className="flex items-center w-full">
              <div className="w-10 h-10 flex items-center justify-center mr-4 text-amber-500">
                <CreditCard className="h-6 w-6" />
              </div>
              <span className="font-medium">Cartão</span>
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <button
          onClick={() => navigate('/cart')}
          className="block w-full bg-primary text-white py-3 rounded-md text-center font-medium"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Payment;
