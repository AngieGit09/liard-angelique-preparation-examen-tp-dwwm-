// ========== MODAL AJOUTER & MODIFIER UN PRODUIT ==========
// Composant modale réutilisable pour la création et la modification de produits (CRUD).
// Gère le formulaire, l’upload d’images, le statut best-seller et l’envoi
// des données vers l’API admin avec authentification par session.

import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

function ModalProduct({
  isOpen,
  onClose,
  mode,
  product,
  hasBestSeller,
  categories = [],
}) {
  // Référence vers l’input file (upload d’images)
  const fileInputRef = useRef(null);

  // ==== ETATS DU FORMULAIRE PRODUIT ====
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");

  // Etat best-seller (produit mis en avant)
  const [isBestSeller, setIsBestSeller] = useState(false);

  // Gestion des images (existantes + nouvelles)
  const [images, setImages] = useState([]);

  // Etat de chargement lors de l’enregistrement
  const [loading, setLoading] = useState(false);

  // ==== INITIALISATION DU FORMULAIRE (MODE ADD / EDIT) ====
  useEffect(() => {
    // Mode édition : pré-remplissage des champs avec les données du produit
    if (mode === "edit" && product) {
      setName(product.title || "");
      setCategory(product.category_id?.toString() || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setStory(product.story || "");
      setIsBestSeller(product.is_featured === 1);

      // Chargement des images existantes depuis la base de données
      if (product.images && product.images.length > 0) {
        const formatted = product.images.map((img) => ({
          id: img.id,
          preview: `http://localhost/renomeuble/backend/${img.image_path}`,
          existing: true,
        }));
        setImages(formatted);
      } else {
        setImages([]);
      }
    }

    // Mode ajout : réinitialisation du formulaire
    if (mode === "add") {
      resetForm();
    }
  }, [mode, product]);

  // ==== RESET COMPLET DU FORMULAIRE ====
  function resetForm() {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStory("");
    setIsBestSeller(false);
    setImages([]);
  }

  // Fermeture sécurisée de la modale (bloquée pendant le loading)
  function handleClose() {
    if (loading) return;
    resetForm();
    onClose();
  }

  // ==== AJOUT D’IMAGES (UPLOAD MULTIPLE) ====
  // Génère un aperçu local via URL.createObjectURL
  function handleAddImages(e) {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null; // Reset input file
  }

  // ==== SUPPRESSION D’UNE IMAGE ====
  // Si image existante → suppression via API
  // Sinon suppression locale uniquement
  async function handleRemoveImage(index) {
    const imageToRemove = images[index];

    try {
      if (imageToRemove.existing && imageToRemove.id) {
        const formData = new FormData();
        formData.append("image_id", imageToRemove.id);

        const response = await fetch(
          "http://localhost/renomeuble/backend/api/admin/products/delete-image.php",
          {
            method: "POST",
            body: formData,
            credentials: "include", // Requête sécurisée (session admin)
          },
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Impossible de supprimer l'image.");
          return;
        }
      }

      // Mise à jour de l’interface sans rechargement
      setImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erreur suppression image :", error);
      alert("Erreur serveur lors de la suppression.");
    }
  }

  // ==== ENVOI DU FORMULAIRE (CREATE / UPDATE) ====
  async function handleSubmit() {
    try {
      // Validation des champs obligatoires
      if (!name || !description || !price || !category || !story) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("story", story);
      formData.append("price", price);
      formData.append("category_id", category);
      formData.append("is_featured", isBestSeller ? 1 : 0);

      // Envoi uniquement des nouvelles images (optimisation API)
      images.forEach((img) => {
        if (!img.existing && img.file) {
          formData.append("images[]", img.file);
        }
      });

      // Ajout de l’id en mode édition
      if (mode === "edit" && product) {
        formData.append("id", product.id);
      }

      // Sélection dynamique de l’endpoint (store ou update)
      const url =
        mode === "edit"
          ? "http://localhost/renomeuble/backend/api/admin/products/update.php"
          : "http://localhost/renomeuble/backend/api/admin/products/store.php";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include", // Authentification par session admin
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement");
      }

      // Réinitialisation et fermeture après succès
      resetForm();
      onClose();

      // Rechargement pour synchroniser l’interface admin
      window.location.reload();
    } catch (error) {
      console.error("Erreur produit :", error);
      alert(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/* En-tête de la modale (mode dynamique : ajout / édition) */}
      <div className="d-flex justify-content-between mb-3">
        <h2 className="h6 admin-modal-title">
          {mode === "edit" ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <button
          type="button"
          className="admin-modal-close"
          onClick={handleClose}
          disabled={loading}
        >
          Fermer ✕
        </button>
      </div>

      {/* Champ nom du produit */}
      <div className="mb-3">
        <label className="form-label">Nom du produit</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Sélection dynamique de la catégorie (données API admin) */}
      <div className="mb-3">
        <label className="form-label">Catégorie</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Champ prix */}
      <div className="mb-3">
        <label className="form-label">Prix (€)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Description du produit */}
      <div className="mb-4">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Histoire du meuble (contenu éditorial) */}
      <div className="mb-4">
        <label className="form-label">Histoire du meuble</label>
        <textarea
          className="form-control"
          rows={4}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Racontez l’histoire du meuble (origine, restauration, époque...)"
        />
      </div>

      {/* Option best-seller (produit mis en avant sur le site) */}
      <div className="mb-3">
        <div className="form-check d-flex align-items-center gap-2">
          <input
            type="checkbox"
            id="bestSeller"
            className="form-check-input"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          <label htmlFor="bestSeller" className="form-check-label fw-semibold">
            Définir comme article best-seller
          </label>
        </div>

        <small className="admin-bestseller-info d-block mt-1">
          Un seul produit peut être best-seller. Si vous cochez cette case,
          l’ancien sera automatiquement remplacé !
        </small>
      </div>

      {/* Gestion des images produit (preview + suppression) */}
      <div className="mb-4">
        <label className="form-label">Images</label>

        <div className="d-flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <div key={index} className="admin-thumb-wrapper">
              <img
                src={img.preview}
                alt="aperçu"
                className="admin-product-thumb"
              />
              <button
                type="button"
                className="admin-thumb-remove"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Bouton d’ouverture de l’input file caché */}
          <button
            type="button"
            className="admin-image-add"
            onClick={() => fileInputRef.current.click()}
          >
            +
          </button>
        </div>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="d-none"
          onChange={handleAddImages}
        />
      </div>

      {/* Bouton de soumission (mode dynamique) */}
      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Enregistrement..."
          : mode === "edit"
            ? "Enregistrer les modifications"
            : "Ajouter le produit"}
      </button>
    </Modal>
  );
}

export default ModalProduct;
