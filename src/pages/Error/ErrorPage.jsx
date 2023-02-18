import { Link } from "react-router-dom";
import { paths } from "~/router";
import error from "./error.svg";
import "./style.scss";

export default function ErrorPage() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <img src={error} alt="ERROR" />
          <p className="text-white text-center err-first">
            THER IS A PROBLEM IN LOADING THIS PAGE !
          </p>
          <p className="text-white text-center err-second mb-4">
            PLEASE CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.
          </p>
          <Link className="tryAgain" to={paths.HOME} replace>
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
