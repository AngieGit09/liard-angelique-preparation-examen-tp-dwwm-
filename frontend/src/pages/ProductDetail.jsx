// ===== PAGE DÉTAIL PRODUIT =====
// Affiche les informations complètes d’un produit (description, images, prix).
// Permet à l’utilisateur de consulter le produit et de naviguer dans ses visuels.

import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getProductById } from "../services/products.service";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  // Récupère le slug de catégorie depuis la navigation (fallback par défaut)
  const categorySlug = location.state?.categorySlug || "meubles-salon";

  // États principaux
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==== CHARGEMENT PRODUIT ====
  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);

        // Formate les URLs des images reçues du backend
        if (data.images && data.images.length > 0) {
          const formattedImages = data.images.map(
            (img) => `http://localhost/renomeuble/backend/${img.image_path}`,
          );

          setImages(formattedImages);
        } else {
          setImages([]);
        }

        // Réinitialise l'image affichée
        setCurrentIndex(0);
      })
      .catch((err) => console.error(err));
  }, [id]); // Recharge si l'id change

  // Loader simple pendant le chargement des données
  if (!product) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  const hasImages = images.length > 0;

  // ==== CARROUSEL ====

  // Image suivante (boucle infinie)
  const nextImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Image précédente (boucle inverse)
  const prevImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Génère 3 miniatures à partir de l'image courante (effet carrousel)
  const thumbnails = hasImages
    ? images
        .slice(currentIndex, currentIndex + 3)
        .concat(images.slice(0, Math.max(0, currentIndex + 3 - images.length)))
    : [];

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5">{product.title}</h1>

      <div className="row align-items-center">
        {/* Description produit */}
        <div className="col-md-3">
          <p className="fw-bold">Description du produit :</p>
          <p>{product.description}</p>
        </div>

        {/* Image principale + navigation */}
        <div className="col-md-6 text-center position-relative">
          {hasImages ? (
            <>
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

              <img
                src={images[currentIndex]}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: "260px", objectFit: "contain" }}
                loading="lazy"
              />

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

        {/* Miniatures cliquables */}
        <div className="col-md-3 d-flex flex-column align-items-center">
          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="miniature"
              className="img-fluid mb-3"
              style={{ width: "80px", cursor: "pointer" }}
              // Permet de changer l'image principale en cliquant sur une miniature
              onClick={() =>
                setCurrentIndex((currentIndex + index) % images.length)
              }
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="text-center mt-5">
        <p className="fw-semibold">
          Retrouvez ce produit dans notre boutique au prix de{" "}
          {/* Formatage du prix pour affichage */}
          {product.price ? parseFloat(product.price).toFixed(2) : "0.00"} €
        </p>

        <p className="fw-bold">La petite histoire de ce meuble :</p>
        <p>{product.story}</p>

        <p className="text-uppercase">
          Derrière chaque meuble se cache une histoire, vous pouvez la continuer
          ... On vous attend dans notre boutique
        </p>

        {/* Retour vers la catégorie d'origine */}
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
