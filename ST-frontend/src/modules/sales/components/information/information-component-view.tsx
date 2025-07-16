'use client'
import React, { useState, useEffect } from 'react';
import { FiInfo, FiMapPin, FiHome, FiClipboard, FiDollarSign, FiPlus } from 'react-icons/fi';
import ModalCreateCashRegister from './modal-create-cashregister';
import { useCashSessions } from '../../hooks/useCashSessions';
import { createCashSession } from '../../action/cash_sessions';
import { cashSessionsAttributes } from '../../types/cash_sessions';

const InformationComponentView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cashSessions, setCashSessions } = useCashSessions();

  useEffect(() => {
    // Fetch cash sessions from the backend
    const fetchCashSessions = async () => {
      // You need to implement the function to get cash sessions from the backend
      // For now, I'll use a placeholder
      const data = await Promise.resolve([]);
      setCashSessions(data);
    };

    fetchCashSessions();
  }, [setCashSessions]);

  const handleCreateCashRegister = async (data: Omit<cashSessionsAttributes, 'id' | 'userId'>) => {
    try {
      // You need to get the userId from the session or context
      const userId = '1'; // Placeholder
      const newCashSession = await createCashSession({ ...data, userId });
      setCashSessions([...cashSessions, newCashSession]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating cash session:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
      {/* Información de la Tienda */}
      <h2 className="text-2xl font-bold text-red-700 flex items-center space-x-2">
        <FiInfo className="text-red-600" size={24} />
        <span>Información de la Tienda</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <FiHome className="text-red-500" size={20} />
            <span className="font-semibold">Nombre de la tienda</span>
          </div>
          <p>Panadería Dulce Sabor</p>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <FiMapPin className="text-red-500" size={20} />
            <span className="font-semibold">Dirección</span>
          </div>
          <p>Av. Principal 1234, Centro Histórico, Lima</p>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 shadow-sm text-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <FiClipboard className="text-red-500" size={20} />
          <span className="font-semibold">Observaciones</span>
        </div>
        <p>Especializada en pasteles personalizados, productos sin gluten, y servicio a domicilio en zonas cercanas.</p>
      </div>

      {/* Información de la Caja */}
      <div className="flex justify-between items-center pt-6">
        <h2 className="text-2xl font-bold text-red-700 flex items-center space-x-2">
          <FiDollarSign className="text-red-600" size={24} />
          <span>Información de Caja</span>
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          <span>Registrar Cierre</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full bg-white text-left text-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-center">Usuario</th>
              <th className="px-4 py-2 text-center">Dinero Inicial</th>
              <th className="px-4 py-2 text-center">Dinero Final</th>
              <th className="px-4 py-2 text-center">Fecha de Término</th>
            </tr>
          </thead>
          <tbody>
            {cashSessions.map((session) => (
              <tr key={session.id} className="border-t">
                <td className="px-4 py-2 text-center">{session.userId}</td>
                <td className="px-4 py-2 text-center">S/ {session.initial_balance.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">S/ {session.final_balance?.toFixed(2) ?? 'N/A'}</td>
                <td className="px-4 py-2 text-center">{new Date(session.createdAt!).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de registro de cierre de caja */}
      <ModalCreateCashRegister
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCashRegister}
      />
    </div>
  );
};

export default InformationComponentView;