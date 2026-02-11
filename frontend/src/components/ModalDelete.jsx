import Modal from "./Modal";

function ModalDelete({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Message de confirmation */}
      <p className="text-center mb-4">
        Êtes-vous sûr de vouloir supprimer cet article ?
      </p>
      {/* Actions utilisateur */}
      <div className="d-flex justify-content-around">
        {/* Confirmer la suppression */}
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onConfirm}
        >
          Confirmer
        </button>

        {/* Annuler / fermer la modale */}
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
