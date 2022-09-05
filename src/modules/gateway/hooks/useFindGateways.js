import { useQuery } from '@tanstack/react-query'
import { _fetch } from '../../../api/APIService'

const useFindGateways = () => {
  const { isLoading, error, data } = useQuery(['gateways'], _fetch)
  const { data: gateways } = data || {}
  return { isLoading, error, gateways }
}

export default useFindGateways
