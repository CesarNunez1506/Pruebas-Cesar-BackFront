'use client'
import { CashSession } from "../types/cash_sessions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCashSession = async (cashSession: Omit<CashSession, 'id' | 'created_at' | 'updated_at'>): Promise<CashSession> => {
    const response = await fetch(`${API_URL}/cash-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashSession),
    });

    if (!response.ok) {
        throw new Error('Failed to create cash session');
    }

    return response.json();
};
