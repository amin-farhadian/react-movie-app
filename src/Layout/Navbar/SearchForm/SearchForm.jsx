import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "~/router";
import { useMovieDispatcherContext } from "~/context/store";
import { setSearchFlag } from "~/context/moviesSlice";
import "./style.scss";

export default function SearchForm({ additionalAction = null }) {
  const [searchStatus, setSearchSatus] = useState(false);
  const [search, setSearch] = useState("");

  useHandleSearchNavigate(search, setSearch, searchStatus, setSearchSatus);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (search) {
      additionalAction && additionalAction();
      setSearchSatus(true);
    }
  };

  return (
    <form
      action="#"
      className="search-form me-4 my-auto"
      onSubmit={submitHandler}
    >
      <div className="input-group">
        <input
          type="text"
          name="text"
          className="form-control border-0"
          placeholder="Search for Movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="input-group-append border-0">
          <button className="btn border-0" type="submit" id="button-addon2">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

function useHandleSearchNavigate(
  searchValue,
  searchHandler,
  searchStatus,
  searchStatusHandler
) {
  const navigate = useNavigate();
  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    if (searchStatus) {
      dispatch(setSearchFlag(searchValue));
      navigate(paths.HOME, {
        replace: false,
      });
      searchStatusHandler(false);
      searchHandler("");
    }
  }, [
    dispatch,
    navigate,
    searchHandler,
    searchStatus,
    searchStatusHandler,
    searchValue,
  ]);
}
