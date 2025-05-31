import { client } from '../client'
import { GetOrders, QueryOrders } from '../dtos'

export const GetOrdersAPI = async (customerId: string, page?: number) => {
  const response = await client.api(
    new GetOrders({
      customerId: customerId,
      page: page,
    }),
  )
  if (response.error) throw response.error
  return response.response
}

export interface QueryOrdersAPIProps {
  freight: number
  skip?: number
  take?: number
  orderBy?: string[]
  orderByDesc?: string[]
  include?: string[]
  fields?: string[]
}
export const QueryOrdersAPI = async (params: QueryOrdersAPIProps) => {
  const response = await client.api(
    new QueryOrders(params as unknown as Partial<QueryOrders>),
  )
  if (response.error) throw response.error
  return response.response
}
