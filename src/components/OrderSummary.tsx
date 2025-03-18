
import { useOrder } from '@/context/OrderContext';

const OrderSummary = () => {
  const { summary } = useOrder();
  
  return (
    <div className="mt-6">
      <h3 className="font-bold text-left mb-4">Resumo de valores</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>R$ {summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Frete</span>
          <span>R$ {summary.delivery.toFixed(2)}</span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Desconto</span>
            <span>-R$ {summary.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>Total</span>
          <span>R$ {summary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
