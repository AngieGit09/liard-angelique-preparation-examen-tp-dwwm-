import Modal from "./Modal";

function ModalCategory({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="d-flex justify-content-between mb-3">
        <h2 className="h6 admin-modal-title">Ajouter une nouvelle catégorie</h2>
        <button type="button" className="admin-modal-close" onClick={onClose}>
          Fermer ✕
        </button>
      </div>

      {/* Formulaire */}
      <div className="mb-4">
        <label className="form-label">Nom de la catégorie</label>
        <input className="form-control" />
      </div>

      <button className="btn btn-primary w-100">Valider</button>
    </Modal>
  );
}

export default ModalCategory;
