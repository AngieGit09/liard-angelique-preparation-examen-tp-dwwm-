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
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // = category_id (BDD)
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Pré-remplissage add / edit */
  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.title || "");
      setCategory(product.category_id || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setIsBestSeller(product.is_featured === 1);
      setImages([]);
    }

    if (mode === "add") {
      resetForm();
    }
  }, [mode, product]);

  function resetForm() {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setIsBestSeller(false);
    setImages([]);
  }

  function handleClose() {
    if (loading) return;
    resetForm();
    onClose();
  }

  function handleAddImages(e) {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  }

  function handleRemoveImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // FONCTION PRINCIPALE : ENVOI A L'API
  async function handleSubmit() {
    try {
      if (!name || !description || !price || !category) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category_id", category);
      formData.append("is_featured", isBestSeller ? 1 : 0);

      // Images
      images.forEach((img) => {
        formData.append("images[]", img.file);
      });

      const url =
        mode === "edit"
          ? "http://localhost/renomeuble/backend/api/admin/products/update.php"
          : "http://localhost/renomeuble/backend/api/admin/products/store.php";

      if (mode === "edit" && product) {
        formData.append("id", product.id);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement");
      }

      // Succès
      resetForm();
      onClose();
      window.location.reload(); // recharge la liste produits (simple et efficace)
    } catch (error) {
      console.error("Erreur produit :", error);
      alert(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/* Header */}
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

      {/* Nom */}
      <div className="mb-3">
        <label className="form-label">Nom du produit</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Catégorie (DYNAMIQUE API + category_id BDD) */}
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

      {/* Prix (sans flèches via CSS) */}
      <div className="mb-3">
        <label className="form-label">Prix (€)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="form-control no-spinner"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ex : 199.99"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Best-seller */}
      <div className="mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="bestSellerCheck"
            checked={isBestSeller}
            disabled={hasBestSeller && !product?.is_featured}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="bestSellerCheck">
            Définir comme article best-seller
          </label>
        </div>

        {hasBestSeller && !product?.is_featured && (
          <small className="text-danger d-block mt-1">
            Un produit est déjà en best-seller. Retirez-le avant d’en définir un
            nouveau.
          </small>
        )}
      </div>

      {/* Images */}
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

      {/* Bouton Action (MAINTENANT FONCTIONNEL) */}
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
