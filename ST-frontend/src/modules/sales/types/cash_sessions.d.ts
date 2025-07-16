export interface CashSession {
  id: number;
  user: string;
  store: string;
  initial_balance: number;
  final_balance: number;
  total_loss: number;
  closing_date: string;
  observations: string;
}
