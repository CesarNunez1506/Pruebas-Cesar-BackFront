import React from 'react';
import { FiX } from 'react-icons/fi';

import { CashSession } from '../../types/cash_sessions';

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
    user: '',
    store: 'Dulce Sabor',
    initial_balance: 0,
    final_balance: 0,
    total_loss: 0,
    closing_date: '',
    observations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['initial_balance', 'final_balance', 'total_loss'].includes(name) ?
              parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación adicional
    if (formData.final_balance < formData.initial_balance) {
      alert('El dinero final no puede ser menor que el dinero inicial');
      return;
    }

    onSubmit(formData);
    onClose();
    setFormData({
      user: '',
      store: 'Dulce Sabor',
      initial_balance: 0,
      final_balance: 0,
      total_loss: 0,
      closing_date: '',
      observations: ''
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
              {/* User */}
              <div>
                <label htmlFor="user" className="block text-gray-700 mb-1">
                  Usuario <span className="text-red-500">*</span>
                </label>
                <input
                  id="user"
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nombre del responsable"
                  required
                />
              </div>

              {/* Store */}
              <div>
                <label htmlFor="store" className="block text-gray-700 mb-1">
                  Tienda <span className="text-red-500">*</span>
                </label>
                <select
                  id="store"
                  name="store"
                  value={formData.store}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="Dulce Sabor">Dulce Sabor</option>
                  <option value="Sucursal Norte">Sucursal Norte</option>
                  <option value="Sucursal Sur">Sucursal Sur</option>
                </select>
              </div>

              {/* Initial Balance */}
              <div>
                <label htmlFor="initial_balance" className="block text-gray-700 mb-1">
                  Dinero Inicial (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="initial_balance"
                  type="number"
                  name="initial_balance"
                  value={formData.initial_balance || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="200.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Final Balance */}
              <div>
                <label htmlFor="final_balance" className="block text-gray-700 mb-1">
                  Dinero Final (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="final_balance"
                  type="number"
                  name="final_balance"
                  value={formData.final_balance || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="500.00"
                  step="0.01"
                  min={formData.initial_balance}
                  required
                />
              </div>

              {/* Total Loss */}
              <div>
                <label htmlFor="total_loss" className="block text-gray-700 mb-1">
                  Total Pérdidas (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  id="total_loss"
                  type="number"
                  name="total_loss"
                  value={formData.total_loss || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="20.00"
                  step="0.01"
                  min="0"
                  max={formData.initial_balance}
                  required
                />
              </div>

              {/* Closing Date */}
              <div>
                <label htmlFor="closing_date" className="block text-gray-700 mb-1">
                  Fecha de Término <span className="text-red-500">*</span>
                </label>
                <input
                  id="closing_date"
                  type="date"
                  name="closing_date"
                  value={formData.closing_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  max={new Date().toISOString().split('T')[0]} // No permite fechas futuras
                />
              </div>
            </div>

            {/* Observations */}
            <div>
              <label htmlFor="observations" className="block text-gray-700 mb-1">
                Observaciones <span className="text-red-500">*</span>
              </label>
              <textarea
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Detalles sobre diferencias, incidentes o comentarios relevantes"
                required
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