// ===== COMPONENT MODAL =====
//
// Composant générique de modale réutilisable
// Gère l’affichage, le fond sombre et le blocage du scroll

import { useEffect } from "react";

function Modal({ children, isOpen, onClose }) {
  useEffect(() => {
    // Bloque le scroll arrière-plan quand la modale est ouverte
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Ne rend rien si la modale est fermée
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        zIndex: 1050,
      }}
      // Ferme la modale si clic extérieur
      onClick={onClose}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--bs-secondary)",
          width: "95%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "12px",
        }}
        // Empêche la fermeture si clic dans la modale
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
