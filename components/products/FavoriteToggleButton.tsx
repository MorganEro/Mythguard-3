import { CardSignInButton } from '../form/Button';
import { fetchFavoriteId } from '@/utils/actions/product/product-server-actions';
import FavoriteToggleForm from './FavoriteToggleForm';
import { auth } from '@clerk/nextjs/server';

async function FavoriteToggleButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { userId } = await auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ productId });

  return (
    <FavoriteToggleForm
      productId={productId}
      favoriteId={favoriteId}
      productName={productName}
    />
  );
}

export default FavoriteToggleButton;
