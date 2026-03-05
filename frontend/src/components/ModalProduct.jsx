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

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.title || "");
      setCategory(product.category_id?.toString() || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setStory(product.story || "");
      setIsBestSeller(product.is_featured === 1);

      const imgs =
        product.images?.map((img) => ({
          id: img.id,
          preview: `${BASE_IMAGE_URL}${img.image_path}`,
          existing: true,
        })) || [];

      setImages(imgs);
    }

    if (mode === "add") resetForm();
  }, [mode, product]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStory("");
    setIsBestSeller(false);
    setImages([]);
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  const handleAddImages = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  };

  const handleSubmit = async () => {
    try {
      if (!name || !description || !price || !category || !story) {
        alert("Veuillez remplir tous les champs.");
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

      images.forEach((img) => {
        if (!img.existing && img.file) {
          formData.append("images[]", img.file);
        }
      });

      if (mode === "edit" && product?.id) {
        formData.append("id", product.id);
      }

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
          l’ancien sera automatiquement remplacé.
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
                onClick={() =>
                  setImages((prev) => prev.filter((_, index) => index !== i))
                }
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
