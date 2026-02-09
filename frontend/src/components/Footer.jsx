import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer ">
      <div className="container footer-inner">
        {/* Logo centré en haut */}
        <div className="text-center mb-4">
          <img
            src="/logo_renomeuble.png"
            alt="Logo RenoMeuble"
            className="footer-logo"
          />
        </div>

        <div className="row g-4 justify-content-center justify-content-md-between">
          {/* === VERSION MOBILE (2 colonnes) === */}
          {/* COLONNE 1 : Plan du site - VISIBLE UNIQUEMENT SUR MOBILE */}
          <div className="col-auto d-md-none">
            <p className="footer-title">Plan du site</p>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/catalogue">Tous nos produits</Link>
              </li>
              <li>
                <Link to="/categorie/salon">Meubles de salon</Link>
              </li>
              <li>
                <Link to="/categorie/chambre">Meubles de chambre</Link>
              </li>
              <li>
                <Link to="/categorie/bureau">Meubles de bureau</Link>
              </li>
              <li>
                <Link to="/categorie/accessoires">Accessoires</Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 2 : Contact + Réseaux - VISIBLE UNIQUEMENT SUR MOBILE */}
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
              <li>
                <Link to="/admin/login">Connexion admin</Link>
              </li>
            </ul>

            {/* Réseaux sociaux horizontaux (mobile) */}
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

          {/* ==== VERSION DESKTOP (horizontal) === */}
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

          {/* Meubles de salon / chambre */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/categorie/salon">Meubles de salon</Link>
              </li>
              <li>
                <Link to="/categorie/chambre">Meubles de chambre</Link>
              </li>
            </ul>
          </div>

          {/* Meubles de bureau / accessoires */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/categorie/bureau">Meubles de bureau</Link>
              </li>
              <li>
                <Link to="/categorie/accessoires">Accessoires</Link>
              </li>
            </ul>
          </div>

          {/* Nous contacter */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/contact">Nous contacter</Link>
              </li>
            </ul>
          </div>

          {/* Mentions légales / CGU */}
          <div className="col-md-auto d-none d-md-block">
            <ul>
              <li>
                <Link to="/mentions">Mentions légales</Link>
              </li>
              <li>
                <Link to="/cgu">CGU</Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux (en colonne verticale desktop) */}
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
