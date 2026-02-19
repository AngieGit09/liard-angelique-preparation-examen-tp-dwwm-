import { useState } from "react";
import Modal from "./Modal";

function ModalDelete({ isOpen, onClose, productId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  async function handleConfirmDelete() {
    if (!productId) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id", productId);

      const response = await fetch(
        "http://localhost/renomeuble/backend/api/admin/products/delete.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      // Mise à jour de la liste côté parent
      if (onDeleted) {
        onDeleted(productId);
      }

      onClose();
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="text-center mb-4">
        Êtes-vous sûr de vouloir supprimer cet article ?
      </p>

      <div className="d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={handleConfirmDelete}
          disabled={loading}
        >
          {loading ? "Suppression..." : "Confirmer"}
        </button>

        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onClose}
          disabled={loading}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
