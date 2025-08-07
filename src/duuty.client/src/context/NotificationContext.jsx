import { createContext, useContext, useState } from 'react';
import { X, Check } from 'lucide-react';

// Notification Context
const NotificationContext = createContext();

// Custom hook to use notifications
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Notification Modal Component
const NotificationModal = ({ isOpen, onClose, type = 'success', message = '', title = '' }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header with close button */}
        <div className="flex justify-end p-4 pb-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center">
            {isSuccess ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" strokeWidth={3} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <X size={32} className="text-red-600" strokeWidth={3} />
              </div>
            )}
          </div>
          
          {/* Title */}
          {title && (
            <h3 className={`text-xl font-semibold mb-2 ${
              isSuccess ? 'text-green-800' : 'text-red-800'
            }`}>
              {title}
            </h3>
          )}
          
          {/* Message */}
          {message && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {message}
            </p>
          )}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              isSuccess 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showSuccess = (message, title = 'Success!') => {
    setNotification({
      isOpen: true,
      type: 'success',
      title,
      message
    });
  };

  const showError = (message, title = 'Error!') => {
    setNotification({
      isOpen: true,
      type: 'error',
      title,
      message
    });
  };

  const close = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const value = {
    showSuccess,
    showError,
    close
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={close}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </NotificationContext.Provider>
  );
};
