import { CashSessionAttributes } from '../types/cash_session.types'

const API_URL = '/api/cash_session'

export const getCashSessions = async (): Promise<CashSessionAttributes[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Error fetching cash sessions')
  }
  const data = await response.json()
  return data.cashSessions
}

export const createCashSession = async (
  cashSession: Omit<CashSessionAttributes, 'id'>,
): Promise<CashSessionAttributes> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cashSession),
  })
  if (!response.ok) {
    throw new Error('Error creating cash session')
  }
  const data = await response.json()
  return data.cashSession
}
