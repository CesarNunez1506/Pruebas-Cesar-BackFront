import { z } from 'zod';

export const CashSessionSchema = z.object({
  user_id: z.number(),
  store_id: z.number(),
  start_amount: z.number(),
  end_amount: z.number(),
  total_returns: z.number(),
  ended_at: z.date(),
});
