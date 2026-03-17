// ===== PAGE ADMIN - GESTION DES CATÉGORIES =====
// Cette page permet à l’administrateur de gérer les catégories (ajout, suppression)
// Les données sont récupérées depuis l’API et mises à jour dynamiquement

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CategoryCardAdmin from "../components/CategoryCardAdmin";
import ModalDelete from "../components/ModalDelete";
import ModalCategory from "../components/ModalCategory";

import {
  getAdminCategories,
  deleteAdminCategory,
} from "../services/admin.service";

function AdminCategories() {
  const navigate = useNavigate();

  // Liste des catégories
  const [categories, setCategories] = useState([]);
  // Catégorie sélectionnée pour suppression
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Gestion des modales (add / delete)
  const [activeModal, setActiveModal] = useState(null);

  // Chargement des catégories (redirige si non authentifié)
  useEffect(() => {
    getAdminCategories()
      .then(setCategories)
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  // Suppression d’une catégorie
  const handleDeleteCategory = async () => {
    await deleteAdminCategory(selectedCategory.id);

    // Mise à jour du state sans rechargement
    setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));

    // Reset modale
    setActiveModal(null);
    setSelectedCategory(null);
  };

  return (
    <section className="container py-5">
      {/* Navigation retour */}
      <Link to="/admin">Retour dashboard</Link>

      <h1 className="text-center mb-5">Gestion catégories</h1>

      <div className="mb-5 text-center">
        {/* Ouverture modale ajout */}
        <button
          className="btn btn-primary rounded-pill px-5 py-3 mb-4"
          onClick={() => {
            setSelectedCategory(null);
            setActiveModal("add");
          }}
        >
          Ajouter une catégorie
        </button>
      </div>

      <div className="row g-4">
        {categories.map((category) => (
          <CategoryCardAdmin
            key={category.id}
            category={category}
            // Prépare la suppression avec confirmation
            onDelete={(cat) => {
              setSelectedCategory(cat);
              setActiveModal("delete");
            }}
          />
        ))}
      </div>

      {/* Modale ajout catégorie */}
      <ModalCategory
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      />

      {/* Modale confirmation suppression */}
      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDeleteCategory}
      />
    </section>
  );
}

export default AdminCategories;
