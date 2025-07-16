import { useState } from 'react';
import { CashSession } from '../models/cash-session.model';
import { toast } from 'react-toastify';

const useCashSession = () => {
  const [cashSessions, setCashSessions] = useState<CashSession[]>([]);

  const fetchCashSessions = async () => {
    try {
      const response = await fetch('/api/cash_session');
      if (!response.ok) {
        throw new Error('Error fetching cash sessions');
      }
      const data = await response.json();
      setCashSessions(data.cashSessions);
    } catch (error) {
      console.error(error);
      toast.error('Error al obtener las sesiones de caja');
    }
  };

  const createCashSession = async (cashSession: Omit<CashSession, 'id'>) => {
    try {
      const response = await fetch('/api/cash_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashSession),
      });
      if (!response.ok) {
        throw new Error('Error creating cash session');
      }
      toast.success('Sesión de caja creada exitosamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear la sesión de caja');
    }
  };

  return {
    cashSessions,
    fetchCashSessions,
    createCashSession,
  };
};

export default useCashSession;
