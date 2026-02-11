import { Link } from "react-router-dom";
import { useState } from "react";
import CardGestion from "../components/CardGestion";

import ModalProduct from "../components/ModalProduct";
import ModalCategory from "../components/ModalCategory";
import ModalDelete from "../components/ModalDelete";

function AdminGestion() {
  const [activeModal, setActiveModal] = useState(null); // "add" | "edit" | "category" | "delete" | null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const products = [
    {
      id: 1,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200€",
      description: "Table à manger",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 2,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200€",
      description: "Table à manger",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 3,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200€",
      description: "Table à manger",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 4,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200€",
      description: "Table à manger",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 5,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200€",
      description: "Table à manger",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
  ];

  return (
    <section className="container py-5">
      {/* Retour */}
      <Link to="/admin" className="text-decoration-none mb-4 d-inline-block">
        Retour vers le dashboard
      </Link>

      <h1 className="text-center mb-5">Gestion des produits</h1>

      {/* Actions */}
      <div className="d-flex flex-column align-items-center gap-3 mb-5">
        <button
          className="btn btn-primary rounded-pill px-4 py-2 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => {
            setSelectedProduct(null);
            setActiveModal("add");
          }}
        >
          Ajouter un produit
        </button>

        <button
          className="btn btn-primary rounded-pill px-4 py-2 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("category")}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* Liste */}
      <div className="row g-4">
        {products.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="col-12 col-md-6">
            <CardGestion
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setActiveModal("edit");
              }}
              onDelete={() => setActiveModal("delete")}
            />
          </div>
        ))}
      </div>

      {/* Voir plus */}
      {visibleCount < products.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-primary rounded-pill px-5"
            onClick={() => setVisibleCount((v) => v + 4)}
          >
            Voir +
          </button>
        </div>
      )}

      {/* Modales */}
      <ModalProduct
        isOpen={activeModal === "add" || activeModal === "edit"}
        mode={activeModal}
        product={selectedProduct}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
      />

      <ModalCategory
        isOpen={activeModal === "category"}
        onClose={() => setActiveModal(null)}
      />

      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={() => setActiveModal(null)}
      />
    </section>
  );
}

export default AdminGestion;
