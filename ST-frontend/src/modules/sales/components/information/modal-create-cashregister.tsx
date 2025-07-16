import React from 'react';
import { FiX } from 'react-icons/fi';
import { CashSession } from '../../models/cash-session.model';

interface ModalCreateCashRegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CashSession, 'id'>) => void;
}

const ModalCreateCashRegister: React.FC<ModalCreateCashRegisterProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<Omit<CashSession, 'id'>>({
    user_id: 1, // Hardcoded user_id
    store_id: 1, // Hardcoded store_id
    start_amount: 0,
    end_amount: 0,
    total_returns: 0,
    ended_at: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['start_amount', 'end_amount', 'total_returns'].includes(name) ?
              parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación adicional
    if (formData.end_amount < formData.start_amount) {
      alert('El dinero final no puede ser menor que el dinero inicial');
      return;
    }

    onSubmit(formData);
    onClose();
    setFormData({
      user_id: 1,
      store_id: 1,
      start_amount: 0,
      end_amount: 0,
      total_returns: 0,
      ended_at: new Date()
    });
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dinero Inicial */}
              <div>
                <label htmlFor="start_amount" className="block text-gray-700 mb-1">
                  Dinero Inicial (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="start_amount"
                  type="number"
                  name="start_amount"
                  value={formData.start_amount || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="200.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Dinero Final */}
              <div>
                <label htmlFor="end_amount" className="block text-gray-700 mb-1">
                  Dinero Final (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="end_amount"
                  type="number"
                  name="end_amount"
                  value={formData.end_amount || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="500.00"
                  step="0.01"
                  min={formData.start_amount}
                  required
                />
              </div>

              {/* Total Pérdidas */}
              <div>
                <label htmlFor="total_returns" className="block text-gray-700 mb-1">
                  Total Pérdidas (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="total_returns"
                  type="number"
                  name="total_returns"
                  value={formData.total_returns || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="20.00"
                  step="0.01"
                  min="0"
                  max={formData.start_amount}
                  required
                />
              </div>

              {/* Fecha de Término */}
              <div>
                <label htmlFor="ended_at" className="block text-gray-700 mb-1">
                  Fecha de Término <span className="text-red-500">*</span>
                </label>
                <input
                  id="ended_at"
                  type="date"
                  name="ended_at"
                  value={formData.ended_at.toString().split('T')[0]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  max={new Date().toISOString().split('T')[0]} // No permite fechas futuras
                />
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