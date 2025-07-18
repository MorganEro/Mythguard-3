import SectionTitle from '@/components/global/SectionTitle';
import ProductsGrid from '@/components/products/ProductsGrid';
import { fetchUserFavorites } from '@/actions/product/product-server-actions';

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  
 if ('message' in favorites) {
    return console.error(favorites.message);
  }
  
  if (favorites.length === 0) {
    return <SectionTitle text="You have no favorites yet." />;
  }

  return (
    <div>
      <SectionTitle text="Your Favorite Products" />
      <ProductsGrid />
    </div>
  );
}
export default FavoritesPage;
