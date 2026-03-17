// ===== COMPONENT MODAL CATEGORY =====
// Formulaire modal pour ajouter une catégorie
// Gère le nom, l’image et l’envoi au backend

import { useRef, useState } from "react";
import Modal from "./Modal";
import { BASE_URL } from "../services/api";

function ModalCategory({ isOpen, onClose }) {
  const fileInputRef = useRef(null);

  // États du formulaire
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setName("");
    setImage(null);
    setPreview(null);
  }

  // Empêche fermeture pendant envoi
  function handleClose() {
    if (loading) return;
    resetForm();
    onClose();
  }

  // Gestion de l'image + preview côté front
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    try {
      // Validation simple
      if (!name.trim()) {
        alert("Veuillez renseigner le nom de la catégorie.");
        return;
      }

      if (!image) {
        alert("Veuillez ajouter une image.");
        return;
      }

      setLoading(true);

      // Utilisation de FormData pour envoyer un fichier
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const response = await fetch(
        `${BASE_URL}/api/admin/categories/store.php`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      resetForm();
      onClose();
      // Recharge pour mettre à jour la liste
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="h6 admin-modal-title">Ajouter une nouvelle catégorie</h2>

        <button className="admin-modal-close" onClick={handleClose}>
          Fermer ✕
        </button>
      </div>

      {/* Champ nom */}
      <div className="mb-4">
        <label className="form-label">Nom de la catégorie</label>

        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Meubles vintage"
        />
      </div>

      {/* Upload image */}
      <div className="mb-4">
        <label className="form-label">Image de la catégorie</label>

        <div className="d-flex justify-content-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "180px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              // Permet de changer l’image en cliquant dessus
              onClick={() => fileInputRef.current.click()}
            />
          ) : (
            <button
              type="button"
              className="admin-image-add"
              onClick={() => fileInputRef.current.click()}
            >
              +
            </button>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="d-none"
          onChange={handleImageChange}
        />
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Enregistrement..." : "Valider"}
      </button>
    </Modal>
  );
}

export default ModalCategory;
