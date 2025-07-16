'use server'
import { revalidatePath } from 'next/cache'
import { ST_BACKEND_URL } from '@/configs/server'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { cashSessionsAttributes } from '../types/cash_sessions'

const ST_BACKEND_URL_CASH_SESSIONS = `${ST_BACKEND_URL}/cash-sessions`

export async function createCashSession(
  data: cashSessionsAttributes
): Promise<cashSessionsAttributes> {
  const session = getCookie('session', { cookies })
  const response = await fetch(ST_BACKEND_URL_CASH_SESSIONS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`
    },
    body: JSON.stringify(data)
  })

  revalidatePath('/sales')
  return await response.json()
}
