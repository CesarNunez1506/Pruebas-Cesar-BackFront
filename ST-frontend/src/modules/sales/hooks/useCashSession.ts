import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCashSessions, createCashSession } from '../action/cash_session'
import { CashSessionAttributes } from '../types/cash_session.types'

export const useCashSession = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cash_sessions'],
    queryFn: getCashSessions,
  })

  const createMutation = useMutation({
    mutationFn: createCashSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cash_sessions'] })
    },
  })

  return {
    cashSessions: data,
    isLoading,
    isError,
    createCashSession: createMutation.mutate,
  }
}
