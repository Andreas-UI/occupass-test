import { useQuery } from '@tanstack/react-query'
import {
  GetAllCustomersAPI,
  GetCustomerDetailsAPI,
  QueryCustomersAPI,
  type QueryCustomersAPIProps,
} from './api'

export const GetAllCustomersQuery = () =>
  useQuery({
    queryKey: ['customers'],
    queryFn: () => GetAllCustomersAPI(),
    staleTime: 5 * 60 * 1000,
  })

export const GetCustomerDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['customer', id],
    queryFn: () => GetCustomerDetailsAPI(id),
    enabled: !!id,
  })

export const QueryCustomersQuery = (params: QueryCustomersAPIProps) =>
  useQuery({
    queryKey: ['query_customers', params],
    queryFn: () => QueryCustomersAPI(params),
  })
