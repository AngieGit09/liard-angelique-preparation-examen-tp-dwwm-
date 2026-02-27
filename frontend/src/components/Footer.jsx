// ========= FOOTER =========
// Pied de page du site.
// Contient le plan du site, les liens légaux, les réseaux sociaux
// ainsi qu’un accès rapide à l’accueil via le logo.
// Les catégories sont récupérées dynamiquement depuis l’API.

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/footer.css";

// LOGO
import logo from "../assets/logo_renomeuble.png";

function Footer() {
  // ==== ETAT DES CATEGORIES DYNAMIQUES ====
  const [categories, setCategories] = useState([]);

  // ==== RECUPERATION DES CATEGORIES ====
  // Permet d'afficher automatiquement les nouvelles catégories
  // ajoutées depuis le back-office admin
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/api/public/categories/index.php")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) =>
        console.error("Erreur chargement catégories footer :", err),
      );
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* ==== LOGO ==== */}
        {/* Le logo renvoie vers la page d’accueil */}
        <div className="text-center mb-4">
          <Link to="/">
            <img src={logo} alt="Logo RenoMeuble" className="footer-logo" />
          </Link>
        </div>

        <div className="row g-4 justify-content-center justify-content-md-between">
          {/* ================= MOBILE ================= */}

          {/* Plan du site */}
          <div className="col-auto d-md-none">
            <p className="footer-title">Plan du site</p>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/catalogue">Tous nos produits</Link>
              </li>

              {/* Catégories dynamiques */}
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/categorie/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Légal MOBILE */}
          <div className="col-auto d-md-none">
            <ul>
              <li>
                <Link to="/contact">Nous contacter</Link>
              </li>
              <li>
                <Link to="/mentions">Mentions légales</Link>
              </li>
              <li>
                <Link to="/cgu">CGU</Link>
              </li>

              {/* RGPD */}
              <li>
                <Link to="/politique-confidentialite">
                  Politique de confidentialité
                </Link>
              </li>

              <li>
                <Link to="/admin/login">Connexion admin</Link>
              </li>
            </ul>

            {/* Réseaux sociaux mobile */}
            <div className="footer-social mt-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* ================= DESKTOP ================= */}

          {/* Plan du site */}
          <div className="col-md-auto d-none d-md-block">
            <p className="footer-title">Plan du site</p>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/catalogue">Tous nos produits</Link>
              </li>
            </ul>
          </div>

          {/* Catégories dynamiques */}
          <div className="col-md-auto d-none d-md-block">
            <p className="footer-title">Catégories</p>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/categorie/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/contact">Nous contacter</Link>
              </li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/mentions">Mentions légales</Link>
              </li>
              <li>
                <Link to="/cgu">CGU</Link>
              </li>

              {/* RGPD */}
              <li>
                <Link to="/politique-confidentialite">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux desktop */}
          <div className="col-md-auto d-none d-md-flex flex-column align-items-center">
            <div className="footer-social-desktop">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Connexion admin */}
          <div className="col-md-auto d-none d-md-block text-center">
            <Link to="/admin/login">Connexion admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
