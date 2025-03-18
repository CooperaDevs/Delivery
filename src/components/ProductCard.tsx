
import { Plus } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Product } from '@/types/types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useOrder();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex gap-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-20 w-20 object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <h3 className="font-medium text-left">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-gray-500 text-left">{product.description}</p>
            )}
            <p className="text-sm font-semibold text-left">R$ {product.price.toFixed(2)}</p>
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
