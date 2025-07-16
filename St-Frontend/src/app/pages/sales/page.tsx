'use client';

import { useState } from 'react';
import { createCashSession } from '@/modules/sales/actions/cash_session';

export default function SalesPage() {
  const [initialBalance, setInitialBalance] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await createCashSession({
        initial_balance: parseFloat(initialBalance),
      });
      setInitialBalance('');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Sales</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="initialBalance">Initial Balance</label>
        <input
          type="number"
          id="initialBalance"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
        />
        <button type="submit">Create Cash Session</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
