import React from "react";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold text-center text-red-600 mb-4">
          Error
        </h2>
        <p className="text-center text-gray-700 mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#FF6F00] text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

