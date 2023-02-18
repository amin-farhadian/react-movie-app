import error from "./404 error.svg";
import "./style.scss";

export default function NotFoundPage() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
    >
      <div className="row">
        <div className="col-12 text-center mt-3">
          <img src={error} alt="404!" />
          <p className="text-white text-center">
            THE PAGE YOU WERE LOKING FOR DOESN'T EXIST!
          </p>
        </div>
      </div>
    </div>
  );
}
