
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useOrder } from '@/context/OrderContext';
import BackButton from '@/components/BackButton';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(parseInt(id || '0'));
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useOrder();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl mb-4">Produto não encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-2 rounded-md"
        >
          Voltar para o menu
        </button>
      </div>
    );
  }

  const handleIncrease = () => {
    setQuantity(qty => qty + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(qty => qty - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-white">
        <BackButton to="/" />
      </div>

      <div className="flex-1 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h1 className="text-2xl font-bold text-left mb-2">{product.name}</h1>
        <p className="text-gray-600 text-left mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-left mb-6">R$ {product.price.toFixed(2)}</p>

        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-6">
          <span className="font-medium">Quantidade</span>
          <div className="flex items-center">
            <button onClick={handleDecrease} className="quantity-button">
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-4 font-semibold">{quantity}</span>
            <button onClick={handleIncrease} className="quantity-button">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-md font-medium"
        >
          Adicionar ao carrinho • R$ {(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
