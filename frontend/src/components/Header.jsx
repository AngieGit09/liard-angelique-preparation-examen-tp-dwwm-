// ========= HEADER PRINCIPAL =========
// Composant de navigation principal du site.
// Gère la navigation, le menu déroulant catégories
// ainsi que la recherche dynamique via routing.

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

//LOGO
import logo from "../assets/logo_renomeuble.png";

function Header() {
  // Etat d’ouverture du menu déroulant
  const [open, setOpen] = useState(false);

  // Etat du champ de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Navigation programmatique
  const navigate = useNavigate();

  // ==== GESTION DE LA RECHERCHE ====
  // Redirection vers la page de résultats avec query string
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate(`/recherche?q=${searchTerm}`);
    setSearchTerm(""); // Réinitialisation du champ après recherche
  };

  return (
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
            className={`nav-item has-dropdown ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="nav-link text-uppercase">
              tous nos produits
              <i className="bi bi-chevron-down"></i>
            </span>

            {/* Sous-menu conditionnel */}
            {open && (
              <div className="dropdown-menu-custom">
                <Link to="/catalogue">Catalogue complet</Link>
                <Link to="/categorie/meubles-salon">Meubles de salon</Link>
                <Link to="/categorie/meubles-chambre">Meubles de chambre</Link>
                <Link to="/categorie/meubles-bureau">Meubles de bureau</Link>
                <Link to="/categorie/accessoires">Accessoires</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="text-uppercase">
            contact
          </Link>
        </nav>

        {/* ==== BARRE DE RECHERCHE ==== */}
        <div className="header-search">
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
        <div className="header-burger d-md-none">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
