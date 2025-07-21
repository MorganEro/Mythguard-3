import { fetchUserFavorites } from '@/actions/product/product-server-actions';
import Section from '@/components/global/sections/Section';
import ProductGridCard from '@/components/products/ProductGridCard';
import { formatCurrency } from '@/lib/format';
import EmptyList from '@/components/global/EmptyList';
import ThreeColumnGrid from '@/components/global/grids/ThreeColumnGrid';

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  
 if ('message' in favorites) {
    return console.error(favorites.message);
  }
  

  return (
    <Section title="Your Favorite Products">
      {favorites.length === 0 ? (
        <EmptyList heading="No favorites found" />
      ) : (
       <ThreeColumnGrid>
          {favorites.map(favorite => {
            const { name, price, image } = favorite.product;
            const productId = favorite.product.id;
            const dollarsAmount = formatCurrency(price);
        return <ProductGridCard
          key={favorite.id}
          productId={productId}
          name={name}
          image={image}
          dollarsAmount={dollarsAmount}
        />
      })}
      </ThreeColumnGrid>
      )}
    </Section>

  );
}
export default FavoritesPage;
