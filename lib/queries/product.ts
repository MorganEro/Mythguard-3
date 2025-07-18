import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProducts, fetchUserFavorites, toggleFavoriteAction } from '@/actions/product/product-server-actions';
import { toast } from 'sonner';
import { Product } from '@prisma/client';

type Favorite = {
  id: string;
  productId: string;
  clerkId: string;
  product: {
    id: string;
    name: string;
  };
};

export const productKeys = {
  favorites: ['products', 'favorites'] as const,
};

// Queries
export const useProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 0,
    retry: false
  });
}

export const useUserFavoritesQuery = (enabled = true) => {
  return useQuery<Favorite[]>({
    queryKey: productKeys.favorites,
    queryFn: fetchUserFavorites,
    enabled,
    staleTime: 0,
    retry: false
  });
};

export const useProductFavoritesQuery = ({ productId, enabled = true }: { productId: string; enabled?: boolean }) => {
  const { data: favorites, isLoading } = useUserFavoritesQuery(enabled);
  const favoriteId = favorites?.find((favorite: Favorite) => favorite.productId === productId)?.id || null;
  
  return { data: favoriteId, isLoading };
};

// Mutations
type UseProductFavoriteProps = {
  productId: string;
  favoriteId: string | null;
  onSuccess?: (newFavoriteId: string | null) => void;
};

export function useProductFavorite({ productId, favoriteId, onSuccess }: UseProductFavoriteProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<string | null, Error, void>({
    mutationFn: async () => {
      return await toggleFavoriteAction({ productId, favoriteId });
    },
    onError: () => {
      toast.error('Failed to update favorite');
    },
    onSuccess: async (newFavoriteId) => {
      await queryClient.invalidateQueries({ 
        queryKey: productKeys.favorites
      });
      
      onSuccess?.(newFavoriteId);
      toast.success(newFavoriteId ? 'Product favorited' : 'Product unfavorited');
    }
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending
  };
}
