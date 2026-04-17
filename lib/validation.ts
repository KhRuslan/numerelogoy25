import { z } from 'zod'
import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js'

const nameSchema = z
  .string()
  .min(2)
  .max(60)
  .regex(/^[\p{L}][\p{L}\s\-]{1,59}$/u, 'invalid name')

export const leadSchema = z
  .object({
    name: nameSchema,
    phone: z.string().min(5).max(20),
    country: z.string().length(2),
    consent: z.literal(true),
    hp: z.string().max(0),
    startedAt: z.number().int(),
  })
  .superRefine((v, ctx) => {
    if (!isValidPhoneNumber(v.phone, v.country as CountryCode)) {
      ctx.addIssue({ code: 'custom', path: ['phone'], message: 'invalid phone' })
    }
    if (Date.now() - v.startedAt < 1500) {
      ctx.addIssue({ code: 'custom', path: ['startedAt'], message: 'too fast' })
    }
  })

export type LeadInput = z.infer<typeof leadSchema>
