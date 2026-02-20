// ========= PAGE PRESENTATION DU PRODUIT =========

// Page d'affichage du détail d'un produit.
// Cette vue récupère les données depuis l'API et gère
// un mini carrousel d'images avec navigation et miniatures.

import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetail() {
  // Récupération de l'identifiant du produit depuis l'URL
  const { id } = useParams();
  // Récupération d'informations optionnelles passées via la navigation
  const location = useLocation();

  // Slug de catégorie utilisé pour le bouton "Retour"
  // Valeur par défaut si aucune catégorie n’est transmise
  const categorySlug = location.state?.categorySlug || "meubles-salon";

  // Etat principal du produit
  const [product, setProduct] = useState(null);
  // Etat des images du produit (formatées pour affichage)
  const [images, setImages] = useState([]);
  // Index de l'image actuellement affichée dans le carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chargement des données produit à chaque changement d'id
  useEffect(() => {
    const API_URL = `http://localhost/renomeuble/backend/api/public/products/show.php?id=${id}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        // Formatage des chemins d'images pour construction des URLs complètes
        if (data.images && data.images.length > 0) {
          const formattedImages = data.images.map(
            (img) => `http://localhost/renomeuble/backend/${img.image_path}`,
          );
          setImages(formattedImages);
        } else {
          setImages([]);
        }

        // Réinitialisation de l'image affichée lors du changement de produit
        setCurrentIndex(0);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Affichage d'un état de chargement tant que les données ne sont pas disponibles
  if (!product) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  const hasImages = images.length > 0;

  // Navigation vers l'image suivante (carrousel circulaire)
  const nextImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Navigation vers l'image précédente (carrousel circulaire)
  const prevImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Génération dynamique des miniatures (maximum 3 visibles)
  // Gestion circulaire pour assurer la continuité visuelle
  const thumbnails = hasImages
    ? images
        .slice(currentIndex, currentIndex + 3)
        .concat(images.slice(0, Math.max(0, currentIndex + 3 - images.length)))
    : [];

  return (
    <section className="container py-5">
      {/* Titre produit */}
      <h1 className="text-center mb-5">{product.title}</h1>

      <div className="row align-items-center">
        {/* Colonne description */}
        <div className="col-md-3">
          <p className="fw-bold">Description du produit :</p>
          <p>{product.description}</p>
        </div>
        {/* Colonne image principale + navigation */}
        <div className="col-md-6 text-center position-relative">
          {hasImages ? (
            <>
              {/* Bouton navigation gauche */}
              <button
                onClick={prevImage}
                className="position-absolute top-50 start-0 translate-middle-y border rounded-circle bg-white"
                style={{
                  width: "38px",
                  height: "38px",
                  color: "var(--bs-primary)",
                }}
              >
                ‹
              </button>

              {/* Image principale */}
              <img
                src={images[currentIndex]}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: "260px", objectFit: "contain" }}
                loading="lazy"
              />

              {/* Bouton navigation droite */}
              <button
                onClick={nextImage}
                className="position-absolute top-50 end-0 translate-middle-y border rounded-circle bg-white"
                style={{
                  width: "38px",
                  height: "38px",
                  color: "var(--bs-primary)",
                }}
              >
                ›
              </button>
            </>
          ) : (
            <p>Aucune image disponible</p>
          )}
        </div>

        {/* Colonne miniatures */}
        <div className="col-md-3 d-flex flex-column align-items-center">
          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="miniature"
              className="img-fluid mb-3"
              style={{ width: "80px", cursor: "pointer" }}
              onClick={() =>
                setCurrentIndex((currentIndex + index) % images.length)
              }
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Section informations complémentaires */}
      <div className="text-center mt-5">
        <p className="fw-semibold">
          Retrouvez ce produit dans notre boutique au prix de{" "}
          {product.price ? parseFloat(product.price).toFixed(2) : "0.00"} €
        </p>

        <p className="fw-bold">La petite histoire de ce meuble :</p>
        <p>{product.story}</p>

        {/* Navigation retour vers la catégorie d'origine */}
        <Link
          to={`/categorie/${categorySlug}`}
          className="btn btn-primary text-uppercase px-5 py-3 mt-3 rounded-pill"
        >
          Retour
        </Link>
      </div>
    </section>
  );
}

export default ProductDetail;
