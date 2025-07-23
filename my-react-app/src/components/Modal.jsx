import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Only close if the click is outside the modal box
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md transition-all"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-fade-in-soft"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all text-xl font-bold"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="mt-2 text-gray-700">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
