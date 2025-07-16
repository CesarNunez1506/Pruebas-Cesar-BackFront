'use server';

import { revalidatePath } from 'next/cache';
import { CreateCashSession } from '../types/cash_session';
import { CreateCashSessionSchema } from '../schemas/cash_session';

export async function createCashSession(data: CreateCashSession) {
  const validation = CreateCashSessionSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid data');
  }

  const response = await fetch('http://localhost:3000/api/cash-sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    throw new Error('Failed to create cash session');
  }

  revalidatePath('/sales');
}
