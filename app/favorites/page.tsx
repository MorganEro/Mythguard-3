import SectionTitle from '@/components/global/SectionTitle';
import ProductsGrid from '@/components/products/ProductsGrid';
import { fetchUserFavorites } from '@/utils/actions/product/product-server-actions';

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  if (!favorites || favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />;
  // Render the favorites list here
  return (
    <div>
      <SectionTitle text="Your Favorites" />
      <ProductsGrid products={favorites.map(favorite => favorite.product)} />
    </div>
  );
}
export default FavoritesPage;
