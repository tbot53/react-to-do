import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-100 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#f8feff] p-6 rounded shadow-lg relative w-96 max-w-full">
        <button 
          onClick={onClose}
          className="  absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
