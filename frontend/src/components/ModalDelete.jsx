// =========== MODAL DE CONFIRMATION DE SUPPRESSION ===========
// Modale générique utilisée pour confirmer la suppression
// d’un élément (produit, catégorie, etc.) dans l’interface admin.
// Composant réutilisable basé sur une modale parent (Modal).

import Modal from "./Modal";

function ModalDelete({ isOpen, onClose, onConfirm }) {
  return (
    // Affichage conditionnel via le composant Modal réutilisable
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Message de confirmation pour sécuriser l’action de suppression */}
      <p className="text-center mb-4">
        Êtes-vous sûr de vouloir supprimer cet élément ?
      </p>

      {/* Actions utilisateur : confirmer ou annuler */}
      <div className="d-flex justify-content-around">
        {/* Bouton de confirmation (déclenche la suppression côté parent) */}
        <button
          type="button"
          className="btn btn-link admin-action text-danger"
          onClick={onConfirm}
        >
          Confirmer
        </button>

        {/* Fermeture de la modale sans action (annulation) */}
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onClose}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
