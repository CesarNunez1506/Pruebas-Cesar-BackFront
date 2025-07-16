export interface CashSession {
  id: string;
  user_id: number;
  store_id: number;
  start_amount: number;
  end_amount: number;
  total_returns: number;
  ended_at: Date;
  created_at?: Date;
  updated_at?: Date;
}
