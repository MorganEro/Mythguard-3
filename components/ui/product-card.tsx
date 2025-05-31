'use client';

// TypeScript interface for our product data
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// TypeScript props interface for our component
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

// React component with TypeScript props and Tailwind classes
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // TypeScript event handler
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    // Tailwind classes for styling
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        {/* Using Tailwind's modern color system */}
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-foreground">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* Dynamic styling with Tailwind */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          {/* Conditional styling based on stock */}
          <span className={`text-sm ${
            product.inStock 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-destructive'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Interactive button with Tailwind states */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                   inline-flex items-center justify-center rounded-md text-sm font-medium
                   transition-colors focus-visible:outline-none focus-visible:ring-2 
                   focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                   h-10 px-4 py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
