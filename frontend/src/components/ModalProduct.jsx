import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

function ModalProduct({ isOpen, onClose, mode, product }) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  /* Pré-remplissage add / edit */
  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.title);
      setCategory(product.category);
      setDescription(product.description);
      setImages([]);
    }

    if (mode === "add") {
      resetForm();
    }
  }, [mode, product]);

  function resetForm() {
    setName("");
    setCategory("");
    setDescription("");
    setImages([]);
  }

  function handleClose() {
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
        >
          Fermer ✕
        </button>
      </div>

      {/* Formulaire */}
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
          <option>Meubles de salon</option>
          <option>Meubles de chambre</option>
          <option>Meubles de bureau</option>
          <option>Accessoires</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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

      {/* Action */}
      <button className="btn btn-primary w-100">
        {mode === "edit"
          ? "Enregistrer les modifications"
          : "Ajouter le produit"}
      </button>
    </Modal>
  );
}

export default ModalProduct;
