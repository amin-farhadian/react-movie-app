import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { paths, searchParameters } from "~/router";
import ModalSearch from "./ModalSearch";
import SearchForm from "./SearchForm";
import SortOrder from "./SortOrder";
import "./style.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(searchParameters.SEARCH_QUERY);

  const allMoviesClickHandler = async () => {
    setSearchParams({});
    navigate(paths.HOME, { replace: true });
  };

  const isAllMovieBtnActive = pathname === paths.HOME && !searchQuery;

  return (
    <section id="navbar" className="col-12">
      <div className="container-md wrapper d-flex justify-content-around align-items-center">
        <div className="left-side pt-1">
          <h2 id="logo" className="d-inline-block me-3 me-md-4">
            <i className="fa fa-film"></i>
          </h2>
          <button
            id="all-movies"
            className={"ms-md-5 " + (isAllMovieBtnActive ? "active" : "")}
            onClick={allMoviesClickHandler}
          >
            Show All Movies
          </button>
        </div>
        <ModalSearch />
        <div className="form-wrapper d-none d-lg-block">
          <SearchForm />
        </div>
        {pathname === paths.HOME && <SortOrder />}
      </div>
    </section>
  );
}
