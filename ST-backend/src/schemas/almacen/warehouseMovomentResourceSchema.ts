import { z } from 'zod'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'

export const warehouseMovementResourceSchema = z.object({
  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  resource_id: z
    .string()
    .uuid('El ID del recurso debe ser un UUID válido')
    .nonempty('El ID del recurso no puede estar vacío'),

  movement_type: z.enum(['salida', 'entrada'], {
    errorMap: () => ({
      message: 'El tipo de movimiento debe ser "salida" o "entrada"',
    }),
  }),

  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .nonnegative('La cantidad no puede ser negativa'),

  movement_date: z.coerce.date({
    invalid_type_error: 'La fecha del movimiento debe ser válida',
  }),

  observations: z
    .string()
    .max(150, 'Las observaciones no deben exceder los 150 caracteres')
    .optional(),
})

export const warehouseMovementResourceValidation = (
  data: WarehouseMovomentResourceAttributes,
) => warehouseMovementResourceSchema.safeParse(data)
