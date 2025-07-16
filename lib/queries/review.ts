import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { fetchAllReviewsByUserWithDetails } from '@/actions/review/review-server-actions';
import { ReviewWithDetails } from '@/types';


//Queries
export function useUserReviews() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['reviews', 'user', user?.id],
    queryFn: async () => {
      const result = await fetchAllReviewsByUserWithDetails();
      if ('message' in result) {
        throw new Error(result.message);
      }
      return result as ReviewWithDetails[];
    },
    enabled: !!user,
  });
}

//Mutations
export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const result = await fetch(`/api/review/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ reviewId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!result.ok) {
        throw new Error('Failed to delete review');
      }
      return result.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['reviews', 'user', user.id] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
