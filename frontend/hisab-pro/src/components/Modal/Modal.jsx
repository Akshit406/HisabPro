import React from 'react';
import { IoCloseSharp } from "react-icons/io5";


const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* Modal content */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b dark:border-gray-100">
          <h3 className="text-lg font-semibold  text-gray-800">
            {title || 'Modal Title'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500  hover:text-gray-700 text-2xl font-bold focus:outline-none"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Body */}
        <div className="text-sm text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
