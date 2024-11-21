import React from "react";

export default function Modal({ isOpen, onClose, message, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 center2">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-lg font-semibold">{message}</div>
        <div>{children}</div>{" "}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-4 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
