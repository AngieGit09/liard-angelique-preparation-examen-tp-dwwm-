import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

function Header() {
  // menu déroulant
  const [open, setOpen] = useState(false);

  // recherche (front uniquement pour l’instant)
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="header">
      <div className="header-inner container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src="/logo_renomeuble.png" alt="Logo RenoMeuble" />
          </Link>
        </div>

        {/* Navigation desktop */}
        <nav className="header-nav d-none d-md-flex">
          <Link to="/" className="text-uppercase">
            accueil
          </Link>

          <div
            className={`nav-item has-dropdown nav-hover ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="nav-link text-uppercase dropdown-trigger">
              tous nos produits
              <i className="bi bi-chevron-down dropdown-icon"></i>
            </span>

            {open && (
              <div className="dropdown-menu-custom">
                <Link to="/catalogue">Catalogue complet</Link>
                <Link to="/categorie/salon">Meubles de salon</Link>
                <Link to="/categorie/chambre">Meubles de chambre</Link>
                <Link to="/categorie/bureau">Meubles de bureau</Link>
                <Link to="/categorie/accessoires">Accessoires</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="text-uppercase">
            contact
          </Link>
        </nav>

        {/* Recherche */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search search-icon"></i>
        </div>

        {/* Burger mobile */}
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
