'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ui/product-card';

// Sample data with TypeScript type
const sampleProducts = [
  {
    id: '1',
    name: 'Mechanical Keyboard',
    price: 159.99,
    description: 'Premium mechanical keyboard with RGB backlight',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    price: 79.99,
    description: 'Ultra-responsive wireless gaming mouse',
    inStock: false,
  },
] as const;

export default function ProductsPage() {
  // State management with TypeScript
  const [cartItems, setCartItems] = useState<string[]>([]);

  // TypeScript function with specific parameter type
  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  return (
    // Tailwind classes for layout and spacing
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">
        Our Products
      </h1>
      
      {/* Grid layout with Tailwind's responsive classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map(product => (
          // Using our ProductCard component with TypeScript props
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Cart summary with dynamic styling */}
      <div className="mt-8 p-4 bg-card rounded-lg border">
        <h2 className="text-lg font-semibold text-foreground">
          Cart Items: {cartItems.length}
        </h2>
      </div>
    </div>
  );
}
