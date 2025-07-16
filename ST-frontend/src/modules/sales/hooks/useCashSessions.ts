import { create } from 'zustand'
import { cashSessionsAttributes } from '../types/cash_sessions'

type State = {
  cashSessions: cashSessionsAttributes[]
  setCashSessions: (cashSessions: cashSessionsAttributes[]) => void
}

export const useCashSessions = create<State>((set) => ({
  cashSessions: [],
  setCashSessions: (cashSessions) => set({ cashSessions })
}))
