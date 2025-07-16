'use client'
import { useState } from 'react';
import { CashSession } from '../types/cash_sessions';
import { createCashSession } from '../action/cash-session.action';

export const useCashSession = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateCashSession = async (cashSession: Omit<CashSession, 'id' | 'created_at' | 'updated_at'>) => {
        setLoading(true);
        setError(null);
        try {
            const newCashSession = await createCashSession(cashSession);
            setLoading(false);
            return newCashSession;
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createCashSession: handleCreateCashSession,
    };
};
