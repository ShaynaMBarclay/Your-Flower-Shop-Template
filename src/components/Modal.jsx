export default function Modal({ children, onClose }) {
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close modal" type="button">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
