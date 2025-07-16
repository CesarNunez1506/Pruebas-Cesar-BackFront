export interface CashSession {
  id: number;
  initial_balance: number;
  final_balance: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCashSession {
  initial_balance: number;
}
