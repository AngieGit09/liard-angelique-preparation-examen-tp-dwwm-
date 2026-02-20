// ========= PAGE D'ACCUEIL =========
// Page principale du site présentant le concept de l'entreprise,
// les informations pratiques et un produit "coup de cœur" récupéré via l'API.

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//LOGO
import logo from "../assets/logo_renomeuble.png";

function Home() {
  // Etat du produit mis en avant (coup de cœur)
  const [featured, setFeatured] = useState(null);

  // Etat de chargement pour gérer l'affichage conditionnel
  const [loading, setLoading] = useState(true);

  // Récupération du produit coup de cœur depuis l'API au montage du composant
  useEffect(() => {
    fetch(
      "http://localhost/renomeuble/backend/api/public/products/featured.php",
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur API");
        }
        return res.json();
      })
      .then((data) => {
        // Stockage du produit mis en avant
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        // Gestion simple des erreurs côté interface
        console.error(err);
        setLoading(false);
      });
  }, []); // Exécuté une seule fois au chargement de la page

  return (
    <div className="home">
      {/* ==== SECTION PRESENTATION DE L'ENTREPRISE ==== */}
      {/* Introduction au concept et à la démarche écoresponsable */}
      <section className="container-fluid px-5 py-3">
        <h1 className="text-center mb-4">
          RénoMeuble : La seconde main dans votre intérieur
        </h1>

        <div className="mb-4">
          <h2 className="h4 fw-semibold mb-3">
            Découvrez le concept de notre entreprise
          </h2>

          <p>
            Reno Meubles est une petite entreprise portée par deux passionnés,
            Emma et Lucas, spécialisés dans la rénovation de meubles d'occasion.
          </p>

          <p>
            Nous récupérons des meubles anciens ou délaissés afin de leur
            redonner une seconde vie grâce à un travail de restauration soigné
            et respectueux des matériaux.
          </p>

          <p className="mb-0">
            À travers une démarche écoresponsable et engagée dans l'économie
            circulaire, nous souhaitons proposer des meubles uniques, durables
            et accessibles, tout en limitant le gaspillage et la surproduction.
            Chaque pièce rénovée raconte une histoire et trouve une nouvelle
            place dans votre intérieur.
          </p>
        </div>
      </section>

      {/* ==== SECTION INFORMATIONS PRATIQUES (ADRESSE, CARTE, HORAIRES) ==== */}
      {/* Mise en avant de la localisation physique et des horaires de la boutique */}
      <section className="container-fluid px-5 py-3">
        <div className="row justify-content-between align-items-start text-center text-md-start g-4">
          {/* Bloc adresse et lien vers la page contact */}
          <div className="col-12 col-md-4">
            <h2 className="h5 fw-semibold mb-3">
              Vous recherchez un meuble ou souhaitez en céder un ?
            </h2>

            <p>
              Voici l'adresse de notre boutique : <br />
              5 Avenue du Mont - Blanc <br />
              69000 LYON
            </p>

            <p>
              Plus d'information en cliquant{" "}
              <Link to="/contact" className="text-uppercase">
                ici
              </Link>
            </p>
          </div>
          {/* LOGO */}
          <div className="col-12 col-md-4 text-center">
            <img
              src={logo}
              alt="Logo RénoMeuble"
              className="img-fluid shadow rounded"
              style={{ maxHeight: "250px" }}
            />
          </div>

          {/* Bloc horaires d'ouverture */}
          <div className="col-12 col-md-4 text-md-end">
            <h2 className="h5 fw-semibold mb-3">
              Horaires de notre boutique :
            </h2>
            <p className="mb-0">
              Lundi 9H00-12H30 14H00-19H00 <br />
              Mardi 9H00-12H30 14H00-19H00 <br />
              Mercredi 9H00-12H30 14H00-19H00 <br />
              Jeudi 9H00-12H30 14H00-19H00 <br />
              Vendredi 9H00-12H30 14H00-19H00 <br />
              Samedi 9H00-19H00 NON STOP <br />
              Dimanche FERMÉ
            </p>
          </div>
        </div>
      </section>

      {/* ==== SECTION CALL TO ACTION ==== */}
      {/* Bouton principal orientant l'utilisateur vers le catalogue */}
      <section className="text-center my-5 py-4">
        <Link
          to="/catalogue"
          className="btn btn-primary px-5 py-3 rounded-pill"
        >
          DECOUVREZ NOS PRODUITS
        </Link>
      </section>

      {/* ==== SECTION PRODUIT COUP DE COEUR ==== */}
      {/* Affichage dynamique d'un produit mis en avant récupéré via l'API */}
      <section className="container py-3 text-center my-5">
        <h2 className="h5 fw-semibold mb-4">Notre article coup de cœur</h2>

        {/* Etat de chargement pendant l'appel API */}
        {loading && <p>Chargement...</p>}

        {/* Affichage du produit si disponible */}
        {!loading && featured && (
          <div className="row align-items-center justify-content-center g-4">
            {/* Image secondaire gauche */}
            <div className="col-4 col-md-2">
              {featured.images?.[1] && (
                <img
                  src={`http://localhost/renomeuble/backend/${featured.images[1].image_path}`}
                  alt={featured.title}
                  className="bestseller-small"
                  loading="lazy"
                />
              )}
            </div>

            {/* Image principale mise en avant */}
            <div className="col-6 col-md-4">
              {featured.images?.[0] && (
                <img
                  src={`http://localhost/renomeuble/backend/${featured.images[0].image_path}`}
                  alt={featured.title}
                  className="bestseller-main"
                  loading="lazy"
                />
              )}
            </div>

            {/* Image secondaire droite */}
            <div className="col-4 col-md-2">
              {featured.images?.[2] && (
                <img
                  src={`http://localhost/renomeuble/backend/${featured.images[2].image_path}`}
                  alt={featured.title}
                  className="bestseller-small"
                  loading="lazy"
                />
              )}
            </div>

            {/* Lien vers la page détail du produit */}
            <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start">
              <Link
                to={`/produit/${featured.id}`}
                className="btn btn-primary rounded-pill px-4"
              >
                VOIR LE PRODUIT
              </Link>
            </div>
          </div>
        )}

        {/* Message de fallback si aucun produit n'est retourné par l'API */}
        {!loading && !featured && <p>Aucun produit coup de cœur disponible.</p>}
      </section>
    </div>
  );
}

export default Home;
