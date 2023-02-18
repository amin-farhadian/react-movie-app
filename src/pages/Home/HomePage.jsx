import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "~/context/store";
import {
  moviesStatusTypes,
  fetchSearchedMoviesHandler,
  fetchAllMoviesHandler,
  sortOrders,
  setSearchFlag,
} from "~/context/moviesSlice";
import useErrorHandler from "~/hooks/useErrorHandler";
import { searchParameters } from "~/router";
import MovieCards from "./MovieCards";
import Buttons from "./Buttons";
import Loader from "../Loader";

export default function HomePage() {
  const { entities, status, searchFlag } = useMovieStateContext();

  useFetchAllMoviesHandler(searchFlag);
  useFetchSearchMoviesHandler();
  useMoviesSearchParamsHandler(searchFlag);
  useErrorHandler(status);

  return (
    <>
      {status === moviesStatusTypes.Success ? (
        <section id="result" className="col-12 pt-5 pb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <MovieCards moviesList={entities} />
                <div className="row">
                  <div className="col-12">
                    <Buttons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

function useMoviesSearchParamsHandler(searchFlag) {
  const dispatch = useMovieDispatcherContext();
  let [, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchFlag) {
      setSearchParams({ [searchParameters.SEARCH_QUERY]: searchFlag });
      dispatch(setSearchFlag(false));
    }
  }, [setSearchParams, searchFlag, dispatch]);
}

function useFetchSearchMoviesHandler() {
  const dispatch = useMovieDispatcherContext();

  let [searchParams] = useSearchParams();
  const searchParameter = searchParams.get(searchParameters.SEARCH_QUERY);
  const sortParameter = searchParams.get(searchParameters.SORT_ORDER);

  const sort = sortParameter || sortOrders.POPULARITY;

  useEffect(() => {
    if (searchParameter) {
      fetchSearchedMoviesHandler(
        dispatch,
        searchParameter,
        sort
      ).then((res) => res);
    }
  }, [dispatch, searchParameter, sort]);
}

function useFetchAllMoviesHandler(searchFlag) {
  const dispatch = useMovieDispatcherContext();

  let [searchParams] = useSearchParams();
  const searchParameter = searchParams.get(searchParameters.SEARCH_QUERY);
  const sortParameter = searchParams.get(searchParameters.SORT_ORDER);
  const pageParameter = searchParams.get(searchParameters.PAGE_NUM);

  const sort = sortParameter || sortOrders.NEWEST;
  const pageNum = pageParameter || "1";

  useEffect(() => {
    if (!searchParameter && !searchFlag) {
      fetchAllMoviesHandler(dispatch, sort, pageNum).then((res) => res);
    }
  }, [dispatch, pageNum, searchFlag, searchParameter, sort]);
}
