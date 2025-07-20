import { fetchUsersContracts } from '@/actions/contract/contract-server-actions';
import { Contract } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

//Queries
export function useUserContracts() {
  return useQuery<Contract[]>({
    queryKey: ['contracts'],
    queryFn: async () => {
      const result = await fetchUsersContracts();
      if ('message' in result) {
        throw new Error(result.message);
      }
      return result as Contract[];
    },
    staleTime: 0,
    retry: false,
  });
}

//Mutations
export function useDeleteContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contractId: string) => {
      const result = await fetch(`/api/contract/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ contractId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!result.ok) {
        throw new Error('Failed to delete contract');
      }
      return result.json();
    },
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['contracts'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
