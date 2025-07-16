import { z } from 'zod';

export const CreateCashSessionSchema = z.object({
  initial_balance: z.number().positive(),
});
