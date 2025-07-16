import { z } from 'zod';

export const cashSessionSchema = z.object({
  user: z.string().min(1, 'El nombre de usuario es requerido'),
  store: z.string().min(1, 'El nombre de la tienda es requerido'),
  initial_balance: z.number().min(0, 'El saldo inicial debe ser un número positivo'),
  final_balance: z.number().min(0, 'El saldo final debe ser un número positivo'),
  total_loss: z.number().min(0, 'El total de pérdidas debe ser un número positivo'),
  closing_date: z.string().min(1, 'La fecha de cierre es requerida'),
  observations: z.string().min(1, 'Las observaciones son requeridas'),
});
