import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CardGestion from "../components/CardGestion";
import ModalProduct from "../components/ModalProduct";
import ModalDelete from "../components/ModalDelete";

import {
  getAdminProducts,
  getAdminCategories,
  deleteAdminProduct,
} from "../services/admin.service";

import { logoutAdmin } from "../services/auth.service";

function AdminGestion() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [visibleCount, setVisibleCount] = useState(4);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  useEffect(() => {
    getAdminProducts()
      .then(setProducts)
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  useEffect(() => {
    getAdminCategories().then(setCategories);
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteAdminProduct(id);

    setProducts((prev) => prev.filter((p) => p.id !== id));

    setActiveModal(null);
    setSelectedProduct(null);
  };

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "date_asc":
          return new Date(a.created_at) - new Date(b.created_at);
        case "date_desc":
          return new Date(b.created_at) - new Date(a.created_at);
        case "alpha_asc":
          return a.title.localeCompare(b.title);
        case "alpha_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <Link to="/admin">Retour dashboard</Link>

        <button onClick={handleLogout} className="btn btn-primary rounded-pill">
          Déconnexion
        </button>
      </div>

      <h1 className="text-center mb-5">Gestion des produits</h1>

      <div className="text-center mb-5">
        <button
          className="btn btn-primary rounded-pill px-5 py-3 mb-4"
          onClick={() => setActiveModal("add")}
        >
          Ajouter un produit
        </button>

        <div className="d-flex justify-content-center gap-3">
          <input
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select"
            style={{ maxWidth: "220px" }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date_desc">Plus récent</option>
            <option value="date_asc">Plus ancien</option>
            <option value="alpha_asc">A → Z</option>
            <option value="alpha_desc">Z → A</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="col-md-6">
            <CardGestion
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setActiveModal("edit");
              }}
              onDelete={() => {
                setSelectedProduct(product);
                setActiveModal("delete");
              }}
            />
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-primary"
            onClick={() => setVisibleCount((v) => v + 4)}
          >
            Voir +
          </button>
        </div>
      )}

      <ModalProduct
        isOpen={activeModal === "add" || activeModal === "edit"}
        mode={activeModal}
        product={selectedProduct}
        categories={categories}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
        onSuccess={() => {
          getAdminProducts().then(setProducts);
        }}
      />

      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={() => {
          if (selectedProduct) {
            handleDeleteProduct(selectedProduct.id);
          }
        }}
      />
    </section>
  );
}

export default AdminGestion;
