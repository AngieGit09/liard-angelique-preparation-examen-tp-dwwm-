import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryCardAdmin from "../components/CategoryCardAdmin";
import ModalCategory from "../components/ModalCategory";

function AdminCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  // Vérification session + chargement catégories
  useEffect(() => {
    fetch(
      "http://localhost/renomeuble/backend/api/admin/categories/index.php",
      {
        credentials: "include",
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Non autorisé");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);

  // Filtrage + tri
  const filteredCategories = categories
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "date_asc":
          return new Date(a.created_at) - new Date(b.created_at);
        case "date_desc":
          return new Date(b.created_at) - new Date(a.created_at);
        case "alpha_asc":
          return a.name.localeCompare(b.name);
        case "alpha_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleLogout = async () => {
    await fetch(
      "http://localhost/renomeuble/backend/authentification/logout.php",
      { credentials: "include" },
    );
    navigate("/admin/login");
  };

  return (
    <section className="container py-5">
      {/* HEADER */}
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

      <h1 className="text-center mb-5">Gestion des catégories</h1>

      {/* ACTIONS */}
      <div className="mb-5 text-center">
        {/* BOUTON PRINCIPAL */}
        <button
          className="btn btn-primary rounded-pill px-5 py-3 mb-4"
          style={{ minWidth: "320px" }}
          onClick={() => setActiveModal("add")}
        >
          Ajouter une catégorie
        </button>

        {/* RECHERCHE + TRI */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Rechercher une catégorie"
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
            <option value="date_desc">Plus récente</option>
            <option value="date_asc">Plus ancienne</option>
            <option value="alpha_asc">A → Z</option>
            <option value="alpha_desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* LISTE */}
      <div className="row g-4 align-items-stretch">
        {filteredCategories.slice(0, visibleCount).map((category) => (
          <CategoryCardAdmin
            key={category.id}
            category={category}
            onEdit={(cat) => {
              setActiveModal("edit");
            }}
            onDelete={(cat) => {
              setActiveModal("delete");
            }}
          />
        ))}
      </div>

      {/* VOIR PLUS */}
      {visibleCount < filteredCategories.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-primary rounded-pill px-5 py-2"
            onClick={() => setVisibleCount((v) => v + 6)}
          >
            Voir +
          </button>
        </div>
      )}

      {/* MODALE */}
      <ModalCategory
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}

export default AdminCategories;
