import React from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cashSessionSchema } from '../../schemas/cash_session.schema';
import { CashSessionAttributes } from '../../types/cash_session.types';

interface ModalCreateCashRegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CashSessionAttributes, 'id'>) => void;
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
  } = useForm<Omit<CashSessionAttributes, 'id'>>({
    resolver: zodResolver(cashSessionSchema),
  });

  const handleFormSubmit = (data: Omit<CashSessionAttributes, 'id'>) => {
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Registro Completo de Cierre de Caja</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar modal"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Usuario */}
              <div>
                <label htmlFor="user_id" className="block text-gray-700 mb-1">
                  Usuario <span className="text-red-500">*</span>
                </label>
                <input
                  id="user_id"
                  type="number"
                  {...register('user_id', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="ID del responsable"
                />
                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id.message}</p>}
              </div>

              {/* Tienda */}
              <div>
                <label htmlFor="store_id" className="block text-gray-700 mb-1">
                  Tienda <span className="text-red-500">*</span>
                </label>
                <input
                  id="store_id"
                  type="number"
                  {...register('store_id', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="ID de la tienda"
                />
                {errors.store_id && <p className="text-red-500 text-sm mt-1">{errors.store_id.message}</p>}
              </div>

              {/* Dinero Inicial */}
              <div>
                <label htmlFor="start_amount" className="block text-gray-700 mb-1">
                  Dinero Inicial (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="start_amount"
                  type="number"
                  step="0.01"
                  {...register('start_amount', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="200.00"
                />
                {errors.start_amount && <p className="text-red-500 text-sm mt-1">{errors.start_amount.message}</p>}
              </div>

              {/* Dinero Final */}
              <div>
                <label htmlFor="end_amount" className="block text-gray-700 mb-1">
                  Dinero Final (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="end_amount"
                  type="number"
                  step="0.01"
                  {...register('end_amount', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="500.00"
                />
                {errors.end_amount && <p className="text-red-500 text-sm mt-1">{errors.end_amount.message}</p>}
              </div>

              {/* Total Pérdidas */}
              <div>
                <label htmlFor="total_returns" className="block text-gray-700 mb-1">
                  Total Pérdidas (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="total_returns"
                  type="number"
                  step="0.01"
                  {...register('total_returns', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="20.00"
                />
                {errors.total_returns && <p className="text-red-500 text-sm mt-1">{errors.total_returns.message}</p>}
              </div>

              {/* Fecha de Término */}
              <div>
                <label htmlFor="ended_at" className="block text-gray-700 mb-1">
                  Fecha de Término <span className="text-red-500">*</span>
                </label>
                <input
                  id="ended_at"
                  type="date"
                  {...register('ended_at')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.ended_at && <p className="text-red-500 text-sm mt-1">{errors.ended_at.message}</p>}
              </div>
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
                Registrar Cierre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateCashRegister;