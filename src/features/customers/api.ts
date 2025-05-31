import { client } from '../client'
import { GetAllCustomers, GetCustomerDetails, QueryCustomers } from '../dtos'

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

export interface QueryCustomersAPIProps {
  ids?: string[]
  countryStartsWith?: string
  skip?: number
  take?: number
  orderBy?: string[]
  orderByDesc?: string[]
  include?: string[]
  fields?: string[]
}
export const QueryCustomersAPI = async (params: QueryCustomersAPIProps) => {
  const response = await client.api(new QueryCustomers(params as unknown as Partial<QueryCustomers>))
  if (response.error) throw response.error
  return response.response
}
