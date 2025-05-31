import z from 'zod'

export const queryCustomersSchema = z.object({
  ids: z.array(z.string()).optional(),
  countryStartsWith: z.string().optional(),
  skip: z.number().optional(),
  take: z.number().optional(),
  orderBy: z.array(z.string()).optional(),
  orderByDesc: z.array(z.string()).optional(),
  include: z.array(z.string()).optional(),
  fields: z.array(z.string()).optional(),
})
