import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const categorySlug = location.state?.categorySlug || "meubles-salon";

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const API_URL = `http://localhost/renomeuble/backend/api/products/show.php?id=${id}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        if (data.images && data.images.length > 0) {
          const formattedImages = data.images.map(
            (img) => `http://localhost/renomeuble/backend/${img.image_path}`,
          );
          setImages(formattedImages);
        } else {
          setImages([]);
        }

        setCurrentIndex(0);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  const hasImages = images.length > 0;

  const nextImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const thumbnails = hasImages
    ? images
        .slice(currentIndex, currentIndex + 3)
        .concat(images.slice(0, Math.max(0, currentIndex + 3 - images.length)))
    : [];

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5">{product.title}</h1>

      <div className="row align-items-center">
        <div className="col-md-3">
          <p className="fw-bold">Description du produit :</p>
          <p>{product.description}</p>
        </div>

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

      <div className="text-center mt-5">
        <p className="fw-semibold">
          Retrouvez ce produit dans notre boutique au prix de{" "}
          {product.price ? parseFloat(product.price).toFixed(2) : "0.00"} €
        </p>

        <p className="fw-bold">La petite histoire de ce meuble :</p>
        <p>{product.story}</p>

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
