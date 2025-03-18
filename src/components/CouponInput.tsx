
import { useState } from 'react';
import { useOrder } from '@/context/OrderContext';
import { Plus } from 'lucide-react';

const CouponInput = () => {
  const [coupon, setCoupon] = useState('');
  const { applyCoupon } = useOrder();

  const handleApplyCoupon = () => {
    if (coupon.trim()) {
      applyCoupon(coupon.trim());
      setCoupon('');
    }
  };

  return (
    <div className="flex items-center gap-2 my-4 p-4 bg-gray-100 rounded-md">
      <input
        type="text"
        placeholder="CUPOM DE DESCONTO"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="flex-1 p-2 bg-transparent focus:outline-none"
      />
      <button 
        onClick={handleApplyCoupon}
        className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CouponInput;
