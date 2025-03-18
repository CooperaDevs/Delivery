
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';

const PaymentPix = () => {
  const navigate = useNavigate();
  const { summary } = useOrder();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simule o carregamento do código QR do PIX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsComplete(true);
    toast({
      title: "Pagamento recebido!",
      description: "Seu pedido foi confirmado e está sendo preparado.",
    });
    
    // Navegue até a página de confirmação do pedido após um breve atraso
    setTimeout(() => {
      navigate('/order-complete');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center">
        <BackButton to="/payment" />
        <h1 className="text-xl font-bold flex-1 text-center">Pagamento</h1>
      </div>

      <div className="flex-1 p-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">PIX</h2>

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-gray-500 mt-4">Carregando código PIX</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-4 rounded-lg border mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg" 
                alt="QR Code PIX" 
                className="w-64 h-64"
              />
            </div>

            <div className="bg-gray-100 p-2 rounded flex items-center mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 h-5 bg-teal-500 rounded flex items-center justify-center mr-2">
                  <span className="text-white text-xs">$</span>
                </span>
                00020126360014BR.GOV.BCB.PIX...
              </div>
              <button className="ml-2 p-1">
                <svg 
                  className="w-5 h-5 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
              </button>
            </div>

            <button 
              className="bg-teal-500 text-white px-8 py-2 rounded font-medium mb-6"
              onClick={handleComplete}
            >
              PAGUE!
            </button>

            <div className="text-center">
              <p className="text-gray-500 font-medium mb-2">STATUS</p>
              {isComplete ? (
                <p className="text-green-500 font-medium">Pagamento Confirmado!</p>
              ) : (
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!isComplete && (
        <div className="p-4 bg-white border-t">
          <button
            onClick={handleComplete}
            className="block w-full bg-gray-400 text-white py-3 rounded-md text-center font-medium"
          >
            Concluir
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPix;
