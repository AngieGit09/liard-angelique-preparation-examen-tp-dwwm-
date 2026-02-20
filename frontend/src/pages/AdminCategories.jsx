// ========= PAGE ADMIN - GESTION DES CATÉGORIES =========
// Interface d’administration dédiée à la gestion des catégories.
// Permet la consultation, l’ajout et la suppression de catégories
// via des appels API sécurisés et des modales dynamiques.

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CategoryCardAdmin from "../components/CategoryCardAdmin";
import ModalDelete from "../components/ModalDelete";
import ModalCategory from "../components/ModalCategory";

function AdminCategories() {
  const navigate = useNavigate();

  // ==== ETATS PRINCIPAUX ====
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  // ==== CHARGEMENT DES CATÉGORIES (ROUTE PROTÉGÉE) ====
  // Vérification implicite de la session via credentials
  useEffect(() => {
    fetch(
      "http://localhost/renomeuble/backend/api/admin/categories/index.php",
      {
        credentials: "include", // Session PHP conservée
      },
    )
      .then((res) => {
        // Redirection vers login si accès non autorisé
        if (!res.ok) throw new Error("Non autorisé");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  // ==== SUPPRESSION D’UNE CATÉGORIE (CRUD - DELETE) ====
  // Suppression via API puis mise à jour locale du state
  async function handleDeleteCategory() {
    if (!selectedCategory) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedCategory.id);

      const response = await fetch(
        "http://localhost/renomeuble/backend/api/admin/categories/delete.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur suppression catégorie");
        return;
      }

      // Mise à jour sans rechargement de la page (UX optimisée)
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory.id),
      );

      setActiveModal(null);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Erreur suppression catégorie :", error);
      alert("Erreur serveur lors de la suppression.");
    }
  }

  return (
    <section className="container py-5">
      {/* ==== HEADER ADMIN ==== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin" className="text-decoration-none">
          Retour vers le dashboard
        </Link>
      </div>

      <h1 className="text-center mb-5">Gestion des catégories</h1>

      {/* ==== ACTION PRINCIPALE : AJOUT CATÉGORIE ==== */}
      <div className="mb-5 text-center">
        <button
          className="btn btn-primary rounded-pill px-5 py-3 mb-4"
          style={{ minWidth: "320px" }}
          onClick={() => {
            setSelectedCategory(null);
            setActiveModal("add");
          }}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* ==== LISTE DES CATÉGORIES ==== */}
      <div className="row g-4">
        {categories.map((category) => (
          <CategoryCardAdmin
            key={category.id}
            category={category}
            // Ouverture de la modale de suppression
            onDelete={(cat) => {
              setSelectedCategory(cat);
              setActiveModal("delete");
            }}
          />
        ))}
      </div>

      {/* ==== MODALE AJOUT CATÉGORIE ==== */}
      <ModalCategory
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      />

      {/* ==== MODALE CONFIRMATION SUPPRESSION ==== */}
      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => {
          setActiveModal(null);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
      />
    </section>
  );
}

export default AdminCategories;
