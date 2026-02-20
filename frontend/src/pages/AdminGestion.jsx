// ========= PAGE GESTION ADMIN =========
// Interface d’administration dédiée à la gestion des produits (CRUD).
// Permet la consultation, la recherche, le tri, l’ajout, la modification
// et la suppression de produits via des modales et des appels API sécurisés.

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardGestion from "../components/CardGestion";
import ModalProduct from "../components/ModalProduct";
import ModalDelete from "../components/ModalDelete";

function AdminGestion() {
  const navigate = useNavigate();

  // Etats principaux : produits et catégories (données admin)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Gestion des modales (add, edit, delete)
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination côté client (affichage progressif)
  const [visibleCount, setVisibleCount] = useState(4);

  // Etats de recherche et de tri
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  // ==== CHARGEMENT DES PRODUITS (ZONE ADMIN SECURISEE) ====
  // Utilisation des credentials pour conserver la session PHP
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/api/admin/products/index.php", {
      credentials: "include",
    })
      .then((res) => {
        // Redirection vers login si non autorisé (session invalide)
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

  // ==== CHARGEMENT DES CATEGORIES (POUR LES FORMULAIRES PRODUITS) ====
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

  // ==== SUPPRESSION D’UN PRODUIT (CRUD - DELETE) ====
  // Suppression via API puis mise à jour du state sans rechargement
  async function handleDeleteProduct(deletedId) {
    try {
      const formData = new FormData();
      formData.append("id", deletedId);

      const response = await fetch(
        "http://localhost/renomeuble/backend/api/admin/products/delete.php",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Requête authentifiée
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur lors de la suppression du produit.");
        return;
      }

      // Mise à jour locale de la liste (optimisation UX)
      setProducts((prev) => prev.filter((p) => p.id !== deletedId));

      // Fermeture de la modale après suppression
      setActiveModal(null);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Erreur suppression produit :", error);
      alert("Erreur serveur lors de la suppression.");
    }
  }

  // ==== FILTRAGE + TRI DES PRODUITS ====
  // Recherche par titre + tri dynamique (date / ordre alphabétique)
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

  // ==== DECONNEXION ADMIN ====
  // Destruction de la session côté backend puis redirection vers login
  const handleLogout = async () => {
    await fetch(
      "http://localhost/renomeuble/backend/authentification/logout.php",
      { credentials: "include" },
    );
    navigate("/admin/login");
  };

  return (
    <section className="container py-5">
      {/* HEADER ADMIN : navigation + déconnexion */}
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

      {/* ==== ACTIONS ADMIN (AJOUT + RECHERCHE + TRI) ==== */}
      <div className="mb-5 text-center">
        {/* Ouverture de la modale d’ajout */}
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

        {/* Barre de recherche + tri */}
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

      {/* ==== LISTE DES PRODUITS (AVEC PAGINATION CLIENT) ==== */}
      <div className="row g-4">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="col-12 col-md-6">
            <CardGestion
              product={product}
              // Ouverture modale édition
              onEdit={() => {
                setSelectedProduct(product);
                setActiveModal("edit");
              }}
              // Ouverture modale suppression
              onDelete={() => {
                setSelectedProduct(product);
                setActiveModal("delete");
              }}
            />
          </div>
        ))}
      </div>

      {/* Bouton d’affichage progressif des produits */}
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

      {/* ==== MODALE AJOUT / EDIT PRODUIT ==== */}
      <ModalProduct
        isOpen={activeModal === "add" || activeModal === "edit"}
        mode={activeModal}
        product={selectedProduct}
        categories={categories}
        // Vérification logique : un seul best-seller autorisé
        hasBestSeller={products.some((p) => p.is_featured === 1)}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
      />

      {/* ==== MODALE DE CONFIRMATION DE SUPPRESSION ==== */}
      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => {
          setActiveModal(null);
          setSelectedProduct(null);
        }}
        onConfirm={() => handleDeleteProduct(selectedProduct?.id)}
      />
    </section>
  );
}

export default AdminGestion;
