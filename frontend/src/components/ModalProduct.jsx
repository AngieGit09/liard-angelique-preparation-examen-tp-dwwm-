// ===== COMPONENT MODAL PRODUCT =====
// Formulaire modal permettant d’ajouter ou modifier un produit
// Gère les champs, les images (upload / suppression) et l’envoi au backend

import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import { BASE_URL, BASE_IMAGE_URL } from "../services/api";

function ModalProduct({
  isOpen,
  onClose,
  onSuccess,
  mode,
  product,
  categories = [],
}) {
  const fileInputRef = useRef(null);

  // États du formulaire
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  // Gestion des images (existantes + nouvelles + supprimées)
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pré-remplit le formulaire en mode édition
    if (mode === "edit" && product) {
      setName(product.title || "");
      setCategory(product.category_id?.toString() || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setStory(product.story || "");
      setIsBestSeller(product.is_featured === 1);

      // Transforme les images backend en objets exploitables côté front
      const imgs =
        product.images?.map((img) => ({
          id: img.id,
          preview: `${BASE_IMAGE_URL}${img.image_path}`,
          existing: true,
        })) || [];

      setImages(imgs);
      setDeletedImages([]);
    }

    // Reset complet en mode ajout
    if (mode === "add") resetForm();
  }, [mode, product]);

  // Réinitialise tous les champs
  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStory("");
    setIsBestSeller(false);
    setImages([]);
    setDeletedImages([]);
  };

  // Empêche la fermeture pendant le chargement
  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  // Ajout de nouvelles images (preview côté front)
  const handleAddImages = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  };

  // Suppression d'une image (frontend + backend si existante)
  const removeImage = (index) => {
    const img = images[index];

    if (img.existing) {
      setDeletedImages((prev) => [...prev, img.id]);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      // Validation simple côté front
      if (!name || !description || !price || !category || !story) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // Données produit
      formData.append("title", name);
      formData.append("description", description);
      formData.append("story", story);
      formData.append("price", price);
      formData.append("category_id", category);
      formData.append("is_featured", isBestSeller ? 1 : 0);

      // Ajout id si modification
      if (mode === "edit" && product?.id) {
        formData.append("id", product.id);
      }

      // Ajout des nouvelles images
      images.forEach((img) => {
        if (!img.existing && img.file) {
          formData.append("images[]", img.file);
        }
      });

      // Envoi des images supprimées
      deletedImages.forEach((id) => {
        formData.append("deleted_images[]", id);
      });

      // Choix endpoint (add ou edit)
      const url =
        mode === "edit"
          ? `${BASE_URL}/api/admin/products/update.php`
          : `${BASE_URL}/api/admin/products/store.php`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      resetForm();
      onClose();

      // Rafraîchit les données parent après succès
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="h6 admin-modal-title">
          {mode === "edit" ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <button className="admin-modal-close" onClick={handleClose}>
          Fermer ✕
        </button>
      </div>

      {/* Champs du formulaire */}
      <div className="mb-3">
        <label className="form-label">Nom du produit</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div className="mb-3">
        <label className="form-label">Prix (€)</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Histoire du meuble</label>
        <textarea
          className="form-control"
          rows={3}
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <div className="form-check d-flex align-items-center gap-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />

          <label className="form-check-label">
            Définir comme article best-seller
          </label>
        </div>
        <small className="admin-bestseller-info d-block mt-1">
          Un seul produit peut être best-seller. Si vous cochez cette case,
          l’ancien sera automatiquement remplacé ! l’ancien sera automatiquement
          remplacé.
        </small>
      </div>

      <div className="mb-4">
        <label className="form-label">Images</label>

        <div className="d-flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="admin-thumb-wrapper">
              <img
                src={img.preview}
                alt="preview"
                className="admin-product-thumb"
              />

              <button
                type="button"
                className="admin-thumb-remove"
                onClick={() => removeImage(i)}
              >
                ✕
              </button>
            </div>
          ))}

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
