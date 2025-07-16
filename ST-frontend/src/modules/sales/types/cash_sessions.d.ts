export interface cashSessionsAttributes {
  id?: string
  userId: string
  initial_balance: number
  final_balance?: number | null
  observations?: string | null
  createdAt?: Date
  updatedAt?: Date
}
