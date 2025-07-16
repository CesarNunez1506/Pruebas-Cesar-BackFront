import React from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cashSessionsAttributes } from '../../types/cash_sessions';
import { CashSessionSchema } from '../../schemas/cash_sessions';

interface ModalCreateCashRegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<cashSessionsAttributes, 'id' | 'userId'>) => void;
}

const ModalCreateCashRegister: React.FC<ModalCreateCashRegisterProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<cashSessionsAttributes, 'id' | 'userId'>>({
    resolver: zodResolver(CashSessionSchema),
  });

  const handleFormSubmit = (data: Omit<cashSessionsAttributes, 'id' | 'userId'>) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Registrar Caja</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar modal"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="initial_balance" className="block text-gray-700 mb-1">
                Dinero Inicial (S/) <span className="text-red-500">*</span>
              </label>
              <input
                id="initial_balance"
                type="number"
                {...register('initial_balance', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="200.00"
                step="0.01"
                min="0"
              />
              {errors.initial_balance && (
                <p className="text-red-500 text-sm mt-1">{errors.initial_balance.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="observaciones" className="block text-gray-700 mb-1">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                {...register('observations')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Detalles sobre la apertura de caja"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                Registrar Caja
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateCashRegister;