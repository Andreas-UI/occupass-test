import { client } from '../client'
import { GetOrders } from '../dtos'

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
