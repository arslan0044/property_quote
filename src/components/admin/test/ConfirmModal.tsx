import React, {FC} from "react"

// import React from 'react'
// const ConfirmModal: FC<> = () => {
   
  

//   };

function ConfirmModal({ isOpen, onClose, onConfirm }:{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this field?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
}

export default ConfirmModal
  