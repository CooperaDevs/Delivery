
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { cn } from '@/lib/utils';

const OrderComplete = () => {
  const { resetOrder, paymentMethod } = useOrder();

  useEffect(() => {
    // Redefinir dados do pedido após a desmontagem do componente
    return () => {
      resetOrder();
    };
  }, [resetOrder]);

  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case 'pix':
        return 'Pagamento PIX realizado com sucesso!';
      case 'card':
        return 'Pagamento com cartão será realizado na entrega.';
      case 'cash':
        return 'Pagamento em dinheiro será realizado na entrega.';
      default:
        return 'Pedido confirmado!';
    }
  };

  const steps = [
    { id: 1, title: 'Pedido recebido', complete: true },
    { id: 2, title: 'Preparando seu pedido', complete: true },
    { id: 3, title: 'Pedido a caminho', complete: false },
    { id: 4, title: 'Entrega realizada', complete: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 p-6 flex flex-col">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-4">{getPaymentMethodText()}</p>
          <p className="text-sm text-gray-500">
            Pedido #12345 • Estimativa de entrega: 30-45 min
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Status do pedido</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      step.complete ? "bg-green-500" : "bg-gray-200"
                    )}
                  >
                    {step.complete ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-sm font-medium text-gray-500">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-12 w-0.5 bg-gray-200 my-1"></div>
                  )}
                </div>
                <div className="pt-1">
                  <p
                    className={cn(
                      "font-medium",
                      step.complete ? "text-green-500" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">Ajuda</h2>
          <button className="flex items-center justify-between w-full py-2 text-gray-600">
            <span>Preciso de ajuda com meu pedido</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <Link
          to="/"
          className="block w-full bg-primary text-white py-3 rounded-md text-center font-medium"
        >
          Voltar para o restaurante
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
