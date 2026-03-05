import Modal from "./Modal";

function ModalDelete({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="text-center mb-4">
        Êtes-vous sûr de vouloir supprimer cet élément ?
      </p>

      <div className="d-flex justify-content-around">
        <button
          className="btn btn-link admin-action text-danger"
          onClick={onConfirm}
        >
          Confirmer
        </button>

        <button className="btn btn-link admin-action" onClick={onClose}>
          Annuler
        </button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
