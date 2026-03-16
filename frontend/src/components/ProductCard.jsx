import { Link, useParams } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  const { slug } = useParams();

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="product-card card border-0 h-100 p-3">
        <h2 className="product-title text-center fw-semibold mb-4">{name}</h2>

        <div className="row align-items-center flex-grow-1">
          <div className="col-5 d-flex flex-column align-items-center justify-content-center text-center">
            <p className="text-primary fw-semibold mb-3">
              {price ? parseFloat(price).toFixed(2) : "0.00"} €
            </p>

            <Link
              to={`/produit/${id}`}
              state={{ categorySlug: slug }}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center text-uppercase"
              style={{ width: "95px", height: "95px", fontSize: "0.7rem" }}
            >
              en voir plus
            </Link>
          </div>

          <div className="col-7 text-center">
            <img
              src={image}
              alt={name}
              className="product-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/images/placeholder.png";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
