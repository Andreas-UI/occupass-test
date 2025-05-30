import { client } from '../client'
import { GetAllCustomers, GetCustomerDetails } from '../dtos'

export const GetAllCustomersAPI = async () => {
  const response = await client.api(new GetAllCustomers({}))
  if (response.error) throw response.error
  return response.response
}

export const GetCustomerDetailsAPI = async (id: string) => {
  const response = await client.api(
    new GetCustomerDetails({
      id: id,
    }),
  )
  if (response.error) throw response.error
  return response.response
}
