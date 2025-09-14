import React, { useState, useEffect } from "react";

const Toast = ({ type = "info", message, show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-100 border-green-400",
      text: "text-green-700",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-100 border-red-400",
      text: "text-red-700",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-100 border-yellow-400",
      text: "text-yellow-700",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-100 border-blue-400",
      text: "text-blue-700",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg ${styles.bg} ${styles.text} max-w-sm transform transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Hook for using toast notifications
export const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    type: "info",
    message: "",
  });

  const showToast = (type, message, duration = 3000) => {
    setToast({ show: true, type, message });

    if (duration > 0) {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, duration);
    }
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const ToastComponent = () => (
    <Toast
      type={toast.type}
      message={toast.message}
      show={toast.show}
      onClose={hideToast}
    />
  );

  return { showToast, hideToast, ToastComponent };
};

export default Toast;
