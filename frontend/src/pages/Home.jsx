import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {/* ==== PRESENTATION ==== */}
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

      {/* ==== ADRESSE + MAP + HORAIRES ==== */}
      <section className="container-fluid px-5 py-3">
        <div className="row justify-content-between align-items-start text-center text-md-start g-4">
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

          <div className="col-12 col-md-4">
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.google.com/maps?q=5+Avenue+du+Mont-Blanc+Lyon&output=embed"
                loading="lazy"
                style={{ border: 0 }}
                title="Carte localisation"
              ></iframe>
            </div>
          </div>

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

      {/* ==== CTA ==== */}
      <section className="text-center my-5 py-4">
        <Link
          to="/catalogue"
          className="btn btn-primary px-5 py-3 rounded-pill"
        >
          DECOUVREZ NOS PRODUITS
        </Link>
      </section>

      {/* ==== PRODUIT COUP DE COEUR ==== */}
      <section className="container py-3 text-center my-5">
        <h2 className="h5 fw-semibold mb-4">Notre article coup de cœur</h2>

        {loading && <p>Chargement...</p>}

        {!loading && featured && (
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              <img
                src={`http://localhost/renomeuble/backend/${featured.image_path}`}
                alt={featured.title}
                className="img-fluid mx-auto d-block product-highlight-img"
              />
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-start justify-content-center">
              <Link
                to={`/produit/${featured.id}`}
                className="btn btn-primary rounded-pill px-4"
              >
                VOIR LE PRODUIT
              </Link>
            </div>
          </div>
        )}

        {!loading && !featured && <p>Aucun produit coup de cœur disponible.</p>}
      </section>
    </div>
  );
}

export default Home;
