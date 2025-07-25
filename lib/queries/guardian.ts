import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllGuardians, fetchUserLikes, toggleLikeAction } from '@/actions/guardian/guardian-server-actions';
import { toast } from 'sonner';
import { Guardian } from '@prisma/client';
import { LikeWithGuardian } from '@/types';

export const guardianKeys = {
  likes: ['guardian', 'likes'] as const,
};

// Queries
export const useGuardiansQuery = () => {
  return useQuery<Guardian[]>({
    queryKey: ['guardians'],
    queryFn: fetchAllGuardians,
    staleTime: 0,
    retry: false
  });
}

export const useUserLikesQuery = (enabled = true) => {
  return useQuery<LikeWithGuardian[]>({
    queryKey: guardianKeys.likes,
    queryFn: fetchUserLikes,
    enabled,
    staleTime: 0,
    retry: false
  });
};

export const useGuardianLikeQuery = ({ guardianId, enabled = true }: { guardianId: string; enabled?: boolean }) => {
  const { data: likes, isLoading } = useUserLikesQuery(enabled);
  const likeId = likes?.find((like: LikeWithGuardian) => like.guardianId === guardianId)?.id || null;
  
  return { data: likeId, isLoading };
};

// Mutations
type UseGuardianLikeProps = {
  guardianId: string;
  likeId: string | null;
  onSuccess?: (newLikeId: string | null) => void;
};

export function useGuardianLike({ guardianId, likeId, onSuccess }: UseGuardianLikeProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<string | null, Error, void>({
    mutationFn: async () => {
      return await toggleLikeAction({ guardianId, likeId });
    },
    onError: () => {
      toast.error('Failed to update like');
    },
    onSuccess: async (newLikeId) => {
      await queryClient.invalidateQueries({ 
        queryKey: guardianKeys.likes
      });
      
      onSuccess?.(newLikeId);
      toast.success(newLikeId ? 'Guardian liked' : 'Guardian unliked');
    }
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending
  };
}
