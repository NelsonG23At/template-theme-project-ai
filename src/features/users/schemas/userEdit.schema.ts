import { z } from 'zod'

export const userEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Must be a valid email'),
  phone: z.string().min(1, 'Phone is required'),
  website: z.string().min(1, 'Website is required'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    suite: z.string(),
    city: z.string().min(1, 'City is required'),
    zipcode: z.string().min(1, 'Zipcode is required'),
  }),
  company: z.object({
    name: z.string().min(1, 'Company name is required'),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
})

export type UserEditFormValues = z.infer<typeof userEditSchema>
