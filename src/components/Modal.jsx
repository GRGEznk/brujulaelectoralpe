import React from "react";
import { X } from "lucide-react";

const Modal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-fondos rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto font-argentum">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-fondos border-b border-gray-200 rounded-t-[40px]">
          <h2 className="text-2xl font-bold text-textos">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 text-justify text-textos">
          <div className="whitespace-pre-line">{content}</div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 bg-fondos border-t border-gray-200 rounded-b-[40px]">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 font-argentum font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
