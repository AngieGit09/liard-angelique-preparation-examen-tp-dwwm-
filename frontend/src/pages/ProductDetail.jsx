import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function ProductDetail() {
  const location = useLocation();

  // fallback si on arrive directement sur la page produit
  const categorySlug =
    location.state && location.state.categorySlug
      ? location.state.categorySlug
      : "salon";

  const price = 200;

  const images = [
    "/images/table_basse.png",
    "/images/table-basse.png",
    "/images/table.png",
    "/images/table_basse.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const thumbnails = [];
  for (let i = 0; i < 3; i++) {
    thumbnails.push(images[(currentIndex + i) % images.length]);
  }

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5">Table basse en chêne</h1>

      <div className="row align-items-center">
        <div className="col-md-3">
          <p className="fw-bold">Description du produit :</p>
          <p>
            Table basse en chêne de couleur claire. Elle mesure 100cm x 70cm et
            60cm de hauteur.
          </p>
        </div>

        <div className="col-md-6 text-center position-relative">
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
            alt="produit"
            className="img-fluid"
            style={{ maxHeight: "260px", objectFit: "contain" }}
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
        </div>

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
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="fw-semibold">
          Retrouvez ce produit dans notre boutique au prix de {price.toFixed(2)}
          €
        </p>
        <p className="fw-bold">La petite histoire de ce meuble :</p>
        <p>
          Chinée dans une ancienne maison familiale, cette table basse en chêne
          portait les marques du temps. Après une rénovation soignée, elle est
          prête à accueillir de nouveaux moments de partage dans votre
          intérieur.
        </p>
        <p className="mt-4">
          Derrière chaque meuble se cache une histoire, vous pouvez la
          continuer... <br /> On vous attend dans notre boutique
        </p>
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
