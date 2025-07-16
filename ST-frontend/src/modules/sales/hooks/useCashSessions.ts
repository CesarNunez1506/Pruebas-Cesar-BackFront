import { useState, useEffect } from 'react';
import { CashSession } from '../types/cash_sessions';

const useCashSessions = () => {
  const [cashSessions, setCashSessions] = useState<CashSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashSessions = async () => {
      try {
        const response = await fetch('/api/cash-sessions');
        if (!response.ok) {
          throw new Error('Failed to fetch cash sessions');
        }
        const data = await response.json();
        setCashSessions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCashSessions();
  }, []);

  const createCashSession = async (session: Omit<CashSession, 'id'>) => {
    try {
      const response = await fetch('/api/cash-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create cash session');
      }

      const newSession = await response.json();
      setCashSessions((prevSessions) => [...prevSessions, newSession]);
    } catch (error) {
      console.error('Error creating cash session:', error);
      setError(error.message);
    }
  };

  return { cashSessions, loading, error, createCashSession };
};

export default useCashSessions;
