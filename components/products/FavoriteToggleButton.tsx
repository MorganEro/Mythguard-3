'use client';

import { useProductFavorite, useProductFavoritesQuery } from '@/lib/queries/product';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { FavoriteSignInButton, FavoriteSubmitButton } from '../form/Button';
import { Spinner } from '../ui/spinner';

type FavoriteToggleButtonProps = {
  productId: string;
};

function FavoriteToggleButton({
  productId,
}: FavoriteToggleButtonProps) {
  const { user } = useUser();
  const { data: initialFavoriteId, isLoading: isQueryLoading } = useProductFavoritesQuery({
    productId,
    enabled: !!user,
  });
  const [currentFavoriteId, setCurrentFavoriteId] = useState<string | null>(initialFavoriteId);

  const isFavorite = !!currentFavoriteId;

  const { mutate, isLoading: isMutating } = useProductFavorite({
    productId,
    favoriteId: currentFavoriteId,
    onSuccess: setCurrentFavoriteId
  });

  if (isQueryLoading) return (
    <div className="flex justify-center p-2">
      <Spinner />
    </div>
  )

  if (!user) return <FavoriteSignInButton />;

  const handleClick = () => {
    mutate();
  };

  return (
    <div onClick={handleClick}>
      <FavoriteSubmitButton isFavorite={isFavorite} isLoading={isMutating} />
    </div>
  );
}

export default FavoriteToggleButton;
