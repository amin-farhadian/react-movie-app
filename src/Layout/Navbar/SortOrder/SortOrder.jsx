import { useSearchParams } from "react-router-dom";
import { sortOrders } from "~/context/moviesSlice";
import { searchParameters } from "~/router";
import "./style.scss";

export default function SortOrder() {
  let [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get(searchParameters.SEARCH_QUERY);
  const sortOrder = searchParams.get(searchParameters.SORT_ORDER);

  const changeSortOrderHandler = async (e) => {
    const sort = e.target.id;

    if (searchValue) {
      setSearchParams({
        [searchParameters.SEARCH_QUERY]: searchValue,
        [searchParameters.SORT_ORDER]: sort,
      });
    } else {
      setSearchParams({ [searchParameters.SORT_ORDER]: sort });
    }
  };

  const allMoviesNewestActiveClass =
    (sortOrder && sortOrder === sortOrders.NEWEST) ||
    (!sortOrder && !searchValue)
      ? "active"
      : "";
  const isNewestDisable = searchValue !== null;

  return (
    <>
      <div className="dropdown me-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu m-0">
          <button
            className={`dropdown-item ${allMoviesNewestActiveClass} ${
              isNewestDisable && "disable"
            }`}
            id={sortOrders.NEWEST}
            onClick={changeSortOrderHandler}
          >
            Newest
          </button>
          <button
            className={`dropdown-item ${
              sortOrder === sortOrders.POPULARITY && "active"
            }`}
            id={sortOrders.POPULARITY}
            onClick={changeSortOrderHandler}
          >
            Popularity
          </button>
          <button
            className={`dropdown-item ${
              sortOrder === sortOrders.RATING && "active"
            }`}
            id={sortOrders.RATING}
            onClick={changeSortOrderHandler}
          >
            Rating
          </button>
        </div>
      </div>
    </>
  );
}
