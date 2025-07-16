import { z } from 'zod'

export const CashSessionSchema = z.object({
  initial_balance: z.number().min(0, {
    message: 'El balance inicial debe ser un número positivo'
  }),
  observations: z.string().optional()
})
