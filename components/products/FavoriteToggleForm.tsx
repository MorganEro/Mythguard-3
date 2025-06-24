'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { CardSubmitButton } from '../form/Button';
import { toggleFavoriteAction } from '@/actions/product/product-server-actions';

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
  productName: string;
};

function FavoriteToggleForm({
  productId,
  favoriteId,
  productName,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    productName,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
