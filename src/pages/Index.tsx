
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useOrder } from '@/context/OrderContext';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('entradas');
  const { items } = useOrder();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pb-24">
      {/* Restaurant Header */}
      <div className="relative">
        <div className="delivery-header"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-4">
          <div className="px-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-left">Pitú com Pirão da Eliane</h1>
                <div className="flex items-center">
                  <span className="text-red-500">●</span>
                  <span className="text-sm text-gray-500 ml-1">Aberto agora</span>
                </div>
              </div>
              <div className="bg-red-500 text-white p-2 rounded-lg flex items-center justify-center">
                <span className="text-sm mr-1">19</span>
                <ShoppingCart className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="mt-4 px-4">
        <h2 className="text-lg font-bold text-left mb-2">Menu do Cardápio</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-md whitespace-nowrap text-sm ${
                activeCategory === category.slug ? 'tab-active' : 'bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="mt-6 px-4">
        <h2 className="text-lg font-medium text-left mb-4">Menu do Cardápio</h2>
        <div className="space-y-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Complete Menu Link */}
      <div className="mt-6 px-4">
        <p className="text-primary text-sm font-medium text-left">Cardápio completo</p>
      </div>

      {/* Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Link
            to="/cart"
            className="block w-full bg-primary text-white py-3 rounded-md text-center font-medium"
          >
            Ver Carrinho
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
