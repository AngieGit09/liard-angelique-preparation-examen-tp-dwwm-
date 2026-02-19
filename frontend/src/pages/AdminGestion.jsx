import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardGestion from "../components/CardGestion";
import ModalProduct from "../components/ModalProduct";
import ModalDelete from "../components/ModalDelete";

function AdminGestion() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // NOUVEAU
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  // Vérification session + chargement produits
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/api/admin/products/index.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Non autorisé");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);

  // Chargement des catégories depuis ton API ADMIN
  useEffect(() => {
    fetch(
      "http://localhost/renomeuble/backend/api/admin/categories/index.php",
      {
        credentials: "include",
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur catégories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Erreur chargement catégories :", err);
      });
  }, []);

  // Filtrage + tri
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
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

  // Déconnexion
  const handleLogout = async () => {
    await fetch(
      "http://localhost/renomeuble/backend/authentification/logout.php",
      { credentials: "include" },
    );
    navigate("/admin/login");
  };

  return (
    <section className="container py-5">
      {/* HEADER TOP */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin" className="text-decoration-none">
          Retour vers le dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="btn btn-primary rounded-pill px-4 py-2"
        >
          Déconnexion
        </button>
      </div>

      <h1 className="text-center mb-5">Gestion des produits</h1>

      {/* ACTIONS */}
      <div className="mb-5 text-center">
        <button
          className="btn btn-primary rounded-pill px-5 py-3 mb-4"
          style={{ minWidth: "320px" }}
          onClick={() => {
            setSelectedProduct(null);
            setActiveModal("add");
          }}
        >
          Ajouter un produit
        </button>

        {/* RECHERCHE + TRI */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Rechercher un produit"
            className="form-control"
            style={{ maxWidth: "300px" }}
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

      {/* LISTE PRODUITS */}
      <div className="row g-4">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="col-12 col-md-6">
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

      {/* VOIR PLUS */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-primary rounded-pill px-5 py-2"
            onClick={() => setVisibleCount((v) => v + 4)}
          >
            Voir +
          </button>
        </div>
      )}

      {/* MODALES */}
      <ModalProduct
        isOpen={activeModal === "add" || activeModal === "edit"}
        mode={activeModal}
        product={selectedProduct}
        categories={categories} // AUTOMATIQUE
        hasBestSeller={products.some((p) => p.isBestSeller)}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
      />

      <ModalDelete
        isOpen={activeModal === "delete"}
        productId={selectedProduct?.id}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
        onDeleted={(deletedId) => {
          setProducts((prev) => prev.filter((p) => p.id !== deletedId));
        }}
      />
    </section>
  );
}

export default AdminGestion;
