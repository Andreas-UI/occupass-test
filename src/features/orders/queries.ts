import { useQuery } from '@tanstack/react-query'
import { GetOrdersAPI, QueryOrdersAPI, type QueryOrdersAPIProps } from './api'

export const GetOrdersQuery = (customerId: string, page?: number) =>
  useQuery({
    queryKey: ['orders', customerId, page],
    queryFn: () => GetOrdersAPI(customerId, page),
    enabled: !!customerId,
  })

export const QueryOrdersQuery = (params: QueryOrdersAPIProps) =>
  useQuery({
    queryKey: ['query_orders', params],
    queryFn: () => QueryOrdersAPI(params),
  })
