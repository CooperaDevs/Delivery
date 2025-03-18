
import { Product } from '@/types/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Mini Pastéis Sortidos',
    description: 'Mix de mini pastéis com diferentes recheios',
    price: 22.00,
    image: '/public/images/food01.jpg'
  },
  {
    id: 2,
    name: 'Frango a Passarinho',
    description: 'Pedaços crocantes de frango temperados',
    price: 32.00,
    image: '/public/images/food.jpg'
  },
  {
    id: 3,
    name: 'Dadinhos de Tapioca',
    description: 'Porção de dadinhos de tapioca com geleia',
    price: 15.00,
    image: '/public/images/food03.png'
  },
  {
    id: 4,
    name: 'Pastel de Carne Grande',
    description: 'Pastel recheado com carne moída temperada',
    price: 18.00,
    image: '/public/images/food04.png'
  },
  {
    id: 5,
    name: 'Pastel de Queijo Grande',
    description: 'Pastel recheado com queijo derretido',
    price: 16.00,
    image: '/public/images/food05.png'
  }
];

export const categories = [
  { id: 1, name: 'Entradas', slug: 'entradas' },
  { id: 2, name: 'Principal', slug: 'principal' },
  { id: 3, name: 'Sobremesas', slug: 'sobremesas' },
  { id: 4, name: 'Bebidas', slug: 'bebidas' },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  // Para fins de demonstração, todos os produtos são devolvidos como "Entradas"
  if (categorySlug === 'entradas') {
    return products;
  }
  return [];
};
