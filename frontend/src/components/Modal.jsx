function Modal({ children, isOpen, onClose }) {
  // SI LA MODALE N'EST PAS OUVERTE RIEN N'EST RENDU
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1050,
      }}
      onClick={onClose} // clic sur le fond = fermer
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--bs-secondary)",
          width: "100%",
          maxWidth: "420px",
        }}
        onClick={(e) => e.stopPropagation()} // empêche fermeture au clic interne
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
