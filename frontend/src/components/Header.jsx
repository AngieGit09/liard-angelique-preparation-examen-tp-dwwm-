import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ==== Fonction recherche ====
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/recherche?q=${searchTerm}`);
    setSearchTerm(""); // optionnel : vide le champ après recherche
  };

  return (
    <header className="header">
      <div className="header-inner container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src="/logo_renomeuble.png" alt="Logo RenoMeuble" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="header-nav d-none d-md-flex">
          <Link to="/" className="text-uppercase">
            accueil
          </Link>

          <div
            className={`nav-item has-dropdown ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="nav-link text-uppercase">
              tous nos produits
              <i className="bi bi-chevron-down"></i>
            </span>

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

        {/* ==== Recherche ==== */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          {/* Loupe cliquable */}
          <i
            className="bi bi-search search-icon"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          ></i>
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
