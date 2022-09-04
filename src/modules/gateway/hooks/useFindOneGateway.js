import { _fetchById } from '../../../api/APIService'

const useFindOneGateways = (id) => {
  return useQuery(['gateways', id], _fetchById(id))
}

export default useFindOneGateways