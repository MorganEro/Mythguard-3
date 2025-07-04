import { fetchFavoriteId } from '@/actions/product/product-server-actions';
import { CardSignInButton } from '../form/Button';
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
  const favoriteId = await fetchFavoriteId({ productId }) as string;

  return (
    <FavoriteToggleForm
      productId={productId}
      favoriteId={favoriteId}
      productName={productName}
    />
  );
}

export default FavoriteToggleButton;
