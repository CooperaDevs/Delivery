
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banknote, ChevronDown } from 'lucide-react';
import BackButton from '@/components/BackButton';

const PaymentCash = () => {
  const navigate = useNavigate();
  const [needChange, setNeedChange] = useState(false);

  const handleComplete = () => {
    navigate('/order-complete');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center">
        <BackButton to="/payment" />
        <h1 className="text-xl font-bold flex-1 text-center">Pagamento</h1>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-6 text-center">Dinheiro</h2>

        <div className="bg-white p-4 rounded-lg border mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Banknote className="h-6 w-6 text-green-500 mr-2" />
            <span className="font-medium">Troco</span>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            {needChange ? 'Informe para quanto precisa de troco' : 'Não precisa de troco'}
          </p>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleComplete}
          className="block w-full bg-green-500 text-white py-3 rounded-md text-center font-medium"
        >
          Concluir
        </button>
      </div>
    </div>
  );
};

export default PaymentCash;
