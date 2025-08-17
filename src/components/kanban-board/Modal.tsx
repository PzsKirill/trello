import React from "react";

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Заголовок */}
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        {/* Контент */}
        {children}

        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
