import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

function Header() {
  // état permettant d’ouvrir / fermer le menu déroulant du catalogue
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner container-fluid d-flex align-items-center justify-content-between">
        {/* Logo + renvoie vers accueil*/}
        <div className="header-logo">
          <Link to="/">
            <img src="/logo_renomeuble.png" alt="Logo RenoMeuble" />
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="header-nav d-none d-md-flex">
          {/* Lien Accueil */}
          <Link to="/" className="text-uppercase">
            accueil
          </Link>
          {/* Menu tous nos produits avec Dropdown */}
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
          {/*Lien Contact */}
          <Link to="/contact" className="text-uppercase">
            contact
          </Link>
        </nav>

        {/* Search */}
        <div className="header-search">
          <input type="text" placeholder="Rechercher" />
          <i className="bi bi-search search-icon"></i> {/* Bootstrap Icons */}
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
