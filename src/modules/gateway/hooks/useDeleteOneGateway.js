
import { useMutation, useQueryClient } from 'react-query'
import { _remove } from '../../../api/APIService'

const useGatewayCreateForm = () => {
  const queryClient = useQueryClient()

  const { mutate, error, isLoading, isSuccess, data } = useMutation(_remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['gateways'])
    },
  })


  return {
    error,
    isLoading,
    isSuccess,
    data,
    onDelete: mutate
  };
};

export default useGatewayCreateForm;
