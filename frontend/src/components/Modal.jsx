// =========== COMPOSANT MODAL GENERIQUE ===========
// Composant de modale réutilisable pour l’ensemble du back-office.
// Gère l’affichage conditionnel, le blocage du scroll en arrière-plan
// et l’overlay centré au-dessus du contenu principal.

import { useEffect } from "react";

function Modal({ children, isOpen, onClose }) {
  // ==== GESTION DU SCROLL DU BODY ====
  // Bloque le scroll de la page lorsque la modale est ouverte (UX)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Nettoyage à la fermeture ou au démontage du composant
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Rendu conditionnel : aucune modale si isOpen = false
  if (!isOpen) return null;

  return (
    // Overlay plein écran positionné au-dessus de l’interface
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)", // Fond assombri
        zIndex: 1050, // Priorité d’affichage au-dessus du contenu
      }}
      /* Fermeture volontairement gérée par les boutons internes */
    >
      {/* Conteneur de la modale (zone de contenu) */}
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--bs-secondary)",
          width: "95%",
          maxWidth: "700px", // Largeur adaptée aux formulaires admin
          maxHeight: "90vh", // Limite hauteur écran
          overflowY: "auto", // Scroll interne si contenu long
          borderRadius: "12px",
        }}
        // Empêche la fermeture lors du clic à l’intérieur de la modale
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenu dynamique injecté (forms, confirmations, etc.) */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
