import React from 'react'

const Modal = ({ show, onClose, children}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        {children}
        <button
          className="modal__close"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal