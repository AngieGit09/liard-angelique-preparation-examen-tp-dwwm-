// =========== MODAL AJOUTER UNE CATEGORIE ===========
// Composant modale dédié à la création d’une nouvelle catégorie.
// Gère le formulaire, l’upload d’une image unique et l’envoi
// des données vers l’API admin avec authentification par session.

import { useRef, useState } from "react";
import Modal from "./Modal";

function ModalCategory({ isOpen, onClose }) {
  // Référence vers l’input file caché (upload image)
  const fileInputRef = useRef(null);

  // ==== ETATS DU FORMULAIRE ====
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==== RESET DU FORMULAIRE ====
  function resetForm() {
    setName("");
    setImage(null);
    setPreview(null);
  }

  // Fermeture sécurisée (bloquée pendant l’envoi)
  function handleClose() {
    if (loading) return;
    resetForm();
    onClose();
  }

  // ==== GESTION DE L’IMAGE (UPLOAD + PREVIEW LOCAL) ====
  // Génère un aperçu avant envoi grâce à URL.createObjectURL
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // ==== ENREGISTREMENT DE LA CATEGORIE (CREATE) ====
  async function handleSubmit() {
    try {
      // Validation minimale côté interface
      if (!name.trim()) {
        alert("Veuillez renseigner le nom de la catégorie.");
        return;
      }

      if (!image) {
        alert("Veuillez ajouter une image pour la catégorie.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const response = await fetch(
        "http://localhost/renomeuble/backend/api/admin/categories/store.php",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Requête sécurisée (session admin)
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'ajout de la catégorie");
      }

      // Réinitialisation et fermeture après succès
      resetForm();
      onClose();

      // Rechargement simple pour synchroniser l’interface admin
      window.location.reload();
    } catch (error) {
      console.error("Erreur catégorie :", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/* ==== HEADER MODALE ==== */}
      <div className="d-flex justify-content-between mb-3">
        <h2 className="h6 admin-modal-title">Ajouter une nouvelle catégorie</h2>
        <button
          type="button"
          className="admin-modal-close"
          onClick={handleClose}
          disabled={loading}
        >
          Fermer ✕
        </button>
      </div>

      {/* ==== CHAMP NOM CATEGORIE ==== */}
      <div className="mb-4">
        <label className="form-label">Nom de la catégorie</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Meubles vintage"
        />
      </div>

      {/* ==== UPLOAD IMAGE UNIQUE ==== */}
      <div className="mb-4">
        <label className="form-label">Image de la catégorie</label>

        <div className="d-flex justify-content-center">
          {preview ? (
            // Aperçu dynamique de l’image sélectionnée
            <img
              src={preview}
              alt="Aperçu catégorie"
              className="category-preview-img"
              onClick={() => fileInputRef.current.click()}
              style={{
                maxWidth: "180px",
                maxHeight: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          ) : (
            // Bouton d’ajout image si aucune sélection
            <button
              type="button"
              className="admin-image-add"
              onClick={() => fileInputRef.current.click()}
              style={{ width: "80px", height: "80px" }}
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

      {/* ==== BOUTON DE VALIDATION ==== */}
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
