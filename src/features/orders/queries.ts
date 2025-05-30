import { useQuery } from '@tanstack/react-query'
import { GetOrdersAPI } from './api'

export const GetOrdersQuery = (customerId: string, page?: number) =>
  useQuery({
    queryKey: ['orders', customerId, page],
    queryFn: () => GetOrdersAPI(customerId, page),
    enabled: !!customerId,
  })
