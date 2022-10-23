import { useMutation, useQueryClient } from '@tanstack/react-query'
import { remove } from '../../../api/APIService'

const useDeleteManyGateway = () => {
  const queryClient = useQueryClient()

  const { mutate, error, isLoading, isSuccess } = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['gateways'])
    },
  })

  return {
    error,
    isLoading,
    isSuccess,
    onDelete: mutate,
  }
}

export default useDeleteManyGateway
