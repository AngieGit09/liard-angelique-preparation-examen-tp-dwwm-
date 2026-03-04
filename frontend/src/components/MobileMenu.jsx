// ========= MENU BURGER MOBILE =========
// Menu plein écran affiché sur mobile.
// Les catégories sont récupérées dynamiquement.
// Inclut une barre de recherche.

import { Link } from "react-router-dom";
import "../styles/mobileMenu.css";

function MobileMenu({
  isOpen,
  onClose,
  categories,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  // Si fermé → rien n'est affiché
  if (!isOpen) return null;

  return (
    /* ===== OVERLAY ===== */
    /* clic en dehors ferme le menu */
    <div className="mobile-overlay" onClick={onClose}>
      {/* ===== CONTENEUR MENU ===== */}
      {/* stopPropagation empêche la fermeture quand on clique dedans */}
      <div
        className="mobile-menu-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER MENU ===== */}
        <div className="mobile-menu-header">
          <span>Menu</span>

          <button onClick={onClose} className="close-menu">
            ✕
          </button>
        </div>

        {/* ===== RECHERCHE ===== */}

        <div className="mobile-search">
          <input
            type="text"
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <i className="bi bi-search" onClick={handleSearch}></i>
        </div>

        {/* ===== NAVIGATION ===== */}

        <nav className="mobile-nav">
          <Link to="/" onClick={onClose}>
            Accueil
          </Link>

          <Link to="/catalogue" onClick={onClose}>
            Tous nos produits
          </Link>

          {/* ===== CATEGORIES ===== */}

          {categories.map((cat) => (
            <Link key={cat.id} to={`/categorie/${cat.slug}`} onClick={onClose}>
              {cat.name}
            </Link>
          ))}

          <Link to="/contact" onClick={onClose}>
            Nous contacter
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
