import { z } from 'zod'
import { ROLES } from '../ts/type'

export const createAdminSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .refine(value => !/<[^>]*>/i.test(value), {
      message: 'Name cannot contain HTML tags'
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  mobile: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 characters long' })
    .max(10, {
      message: 'Mobile number cannot be more than 10 characters long'
    })
})

export const createUserBodySchema = z.object({
  upLinkCode: z.string().min(8, { message: 'Uplink Code is required' }),
  name: z.string().min(3, { message: 'Name is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  mobile: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 characters long' }),
  reference: z.string(),
  share: z.number(),
  sessionCommission: z.number(),
  matchCommission: z.number(),
  mobileShare: z.number(),
  mobileCharge: z.number()
})

export const codeValidator = z.object({
  code: z.string().min(8, { message: 'Code is invalid' })
})

export const limitValidator = z.object({
  parentCode: z.string().min(8, { message: 'Code is invalid' }),
  childCode: z.string().min(8, { message: 'Code is invalid' }),
  limit: z.number().min(0, { message: 'limit is invalid' })
})

export const updatePasswordValidator = z.object({
  code: z.string().min(8, { message: 'Code is invalid' }),
  newPassword: z.string().min(6, { message: 'Password is invalid' }),
  role: z.nativeEnum(ROLES)
})


export const dateSchema = z.date().refine(date => !isNaN(date.getTime()), {
  message: 'Invalid date format'
})

export const codeAndDatesValidator = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
  startDate: dateSchema,
  endDate: dateSchema
})
