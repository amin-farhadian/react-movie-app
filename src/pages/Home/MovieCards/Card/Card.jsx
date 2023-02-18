import { Link } from "react-router-dom";
import "./style.scss";

export default function Card({ id, poster, title, vote }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <Link to={`/movies/${id}`} replace={false}>
        <div className="card custom-card mx-auto position-relative">
          <img src={poster} alt={title} />
          <div className="card-overlay position-absolute d-flex flex-column align-items-center justify-content-between">
            <div className="card-rating">
              <i className="fa fa-star-o me-1"></i>
              <span>{Number(vote).toFixed(1)}</span>
            </div>
            <div className="card-title w-100 d-flex justify-content-around align-items-center">
              <h4>{title}</h4>
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
