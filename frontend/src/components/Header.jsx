// ========= HEADER PRINCIPAL =========
// Composant de navigation principal du site.
// Gère la navigation, le menu déroulant catégories
// ainsi que la recherche dynamique via routing.

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getCategories } from "../services/categories.service";
import MobileMenu from "../components/MobileMenu";
import "../styles/header.css";

// LOGO
import logo from "../assets/logo_renomeuble.png";

function Header() {
  // Etat d’ouverture du menu déroulant desktop
  const [open, setOpen] = useState(false);

  // Etat d’ouverture du menu burger mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  // Etat du champ de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Etat des catégories récupérées dynamiquement depuis l’API
  const [categories, setCategories] = useState([]);

  // Navigation programmatique
  const navigate = useNavigate();

  // Référence du dropdown pour détecter les clics extérieurs
  const dropdownRef = useRef(null);

  // ==== RECUPERATION DES CATEGORIES ====
  // Chargement automatique au montage du composant
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      }
    };

    loadCategories();
  }, []);

  // ==== FERMETURE AUTOMATIQUE DU DROPDOWN ====
  // Ferme le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==== FERME MENU MOBILE SI PASSAGE EN DESKTOP ====
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ==== GESTION DE LA RECHERCHE ====
  // Redirection vers la page de résultats avec query string
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate(`/recherche?q=${searchTerm}`);
    setSearchTerm(""); // Réinitialisation du champ après recherche
    setMobileOpen(false); // fermeture menu mobile après recherche
  };

  return (
    <>
      <header className="header">
        <div className="header-inner container-fluid d-flex align-items-center justify-content-between">
          {/* ==== LOGO ==== */}
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="Logo RenoMeuble" />
            </Link>
          </div>

          {/* ==== NAVIGATION DESKTOP ==== */}
          <nav className="header-nav d-none d-md-flex">
            <Link to="/" className="text-uppercase">
              accueil
            </Link>

            {/* Menu déroulant catégories */}
            <div
              ref={dropdownRef}
              className={`nav-item has-dropdown ${open ? "open" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              <span className="nav-link text-uppercase">
                tous nos produits
                <i className="bi bi-chevron-down"></i>
              </span>

              {/* Sous-menu dynamique */}
              {open && (
                <div className="dropdown-menu-custom">
                  <Link to="/catalogue">Catalogue complet</Link>

                  {/* Catégories récupérées depuis la base */}
                  {categories.map((category) => (
                    <Link key={category.id} to={`/categorie/${category.slug}`}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="text-uppercase">
              contact
            </Link>
          </nav>

          {/* ==== BARRE DE RECHERCHE (DESKTOP) ==== */}
          <div className="header-search d-none d-md-flex">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                // Déclenchement de la recherche avec la touche Entrée
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            {/* Icône loupe cliquable */}
            <i
              className="bi bi-search search-icon"
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {/* ==== MENU BURGER (RESPONSIVE MOBILE) ==== */}
          <div
            className="header-burger d-md-none"
            onClick={() => setMobileOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* ==== MENU MOBILE (COMPOSANT SEPARE) ==== */}
      {/* Overlay plein écran affiché sur mobile */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />
    </>
  );
}

export default Header;
