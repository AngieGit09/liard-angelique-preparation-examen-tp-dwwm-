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

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    getAdminCategories()
      .then(setCategories)
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const handleDeleteCategory = async () => {
    await deleteAdminCategory(selectedCategory.id);

    setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));

    setActiveModal(null);
    setSelectedCategory(null);
  };

  return (
    <section className="container py-5">
      <Link to="/admin">Retour dashboard</Link>

      <h1 className="text-center mb-5">Gestion catégories</h1>

      <div className="mb-5 text-center">
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
            onDelete={(cat) => {
              setSelectedCategory(cat);
              setActiveModal("delete");
            }}
          />
        ))}
      </div>

      <ModalCategory
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      />

      <ModalDelete
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDeleteCategory}
      />
    </section>
  );
}

export default AdminCategories;
