
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { useOrder } from '@/context/OrderContext';
import { DeliveryAddress } from '@/types/types';
import { Check } from 'lucide-react';

const Address = () => {
  const navigate = useNavigate();
  const { address: savedAddress, setAddress } = useOrder();
  
  const [address, setAddressState] = useState<DeliveryAddress>({
    cep: '',
    street: '',
    number: '',
    complement: '',
    pickup: false,
  });

  useEffect(() => {
    if (savedAddress) {
      setAddressState(savedAddress);
    }
  }, [savedAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(address);
    navigate('/cart');
  };

  const isFormValid = () => {
    if (address.pickup) return true;
    return Boolean(address.street && address.number);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center">
        <BackButton to="/cart" />
        <h1 className="text-xl font-bold flex-1 text-center">Carrinho</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-left mb-1">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              type="text"
              value={address.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="street" className="block text-sm font-medium text-left mb-1">
                Rua
              </label>
              <input
                id="street"
                name="street"
                type="text"
                value={address.street}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="w-24">
              <label htmlFor="number" className="block text-sm font-medium text-left mb-1">
                Número
              </label>
              <input
                id="number"
                name="number"
                type="text"
                value={address.number}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="complement" className="block text-sm font-medium text-left mb-1">
              Complemento
            </label>
            <input
              id="complement"
              name="complement"
              type="text"
              value={address.complement}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              id="pickup"
              name="pickup"
              type="checkbox"
              checked={address.pickup}
              onChange={handleChange}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="pickup" className="ml-2 block text-sm text-gray-700">
              Retirar no restaurante
            </label>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white sticky bottom-0">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 rounded-md text-center font-medium ${
              isFormValid()
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
