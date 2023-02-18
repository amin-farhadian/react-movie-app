import {
  getSortedMoviesPages,
  createMoviesRawArray,
  fetchAllMovies,
  fetchSearchedMovies,
  fetchMovie,
} from "./fetchMovies";

export const moviesStatusTypes = {
  Success: "success",
  Pending: "pending",
  Error: "error",
};

export const sortOrders = {
  NEWEST: "now_playing",
  POPULARITY: "popular",
  RATING: "top_rated",
};

export const actionTypes = {
  FETCH_ALL_MOVIES_SUCCESS: "allMovies/fetchMoviesSuccess",
  FETCH_MOVIES_PENDING: "movies/fetchMoviesPending",
  FETCH_MOVIES_FAILED: "movies/fetchMoviesFailed",
  FETCH_SEARCHED_MOVIES_SUCCESS: "searchedMovies/fetchSearchedMoviesSuccess",
  SET_SEARCHED_MOVIES_SORT_ORDER: "searchedMovies/setSortOrder",
  FETCH_MOVIE_SUCCESS: "movie/fetchMovieSuccess",
  FETCH_MOVIE_PENDING: "movies/fetchMoviePending",
  FETCH_MOVIE_FAILED: "movies/fetchMovieFailed",
  SET_SEARCH_FLAG: "appFlags/setSearchFlag",
};

// Reducer -------------------------------------------------------------------------------------------

export const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
      const { allMovies, totalPages } = action.payload;
      newState = {
        ...state,
        totalPages,
        searchValue: null,
        entities: allMovies,
        status: moviesStatusTypes.Success,
      };
      break;

    case actionTypes.FETCH_SEARCHED_MOVIES_SUCCESS:
      const { searchedMovies, pagesCount, searchValue } = action.payload;
      newState = {
        ...state,
        totalPages: pagesCount,
        searchValue,
        entities: searchedMovies,
        status: moviesStatusTypes.Success,
      };
      break;

    case actionTypes.SET_SEARCHED_MOVIES_SORT_ORDER:
      const { sortedMovies } = action.payload;
      newState = {
        ...state,
        entities: sortedMovies,
        status: moviesStatusTypes.Success,
      };
      break;

    case actionTypes.SET_SEARCH_FLAG:
      const searchFlag = action.payload;
      newState = {
        ...state,
        searchFlag,
      };
      break;

    case actionTypes.FETCH_MOVIES_PENDING:
      newState = {
        ...state,
        entities: {},
        status: moviesStatusTypes.Pending,
      };
      break;

    case actionTypes.FETCH_MOVIES_FAILED:
      newState = {
        ...state,
        status: moviesStatusTypes.Error,
      };
      break;

    case actionTypes.FETCH_MOVIE_SUCCESS:
      newState = {
        ...state,
        status: moviesStatusTypes.Success,
      };
      break;

    case actionTypes.FETCH_MOVIE_PENDING:
      newState = {
        ...state,
        status: moviesStatusTypes.Pending,
      };
      break;

    case actionTypes.FETCH_MOVIE_FAILED:
      newState = {
        ...state,
        status: moviesStatusTypes.Error,
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

// Action Factories ----------------------------------------------------------------------------------

export const fetchedAllMoviesSuccess = (allMovies, totalPages) => ({
  type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
  payload: {
    allMovies,
    totalPages,
  },
});

export const fetchedSearchedMoviesSuccess = (movies, searchValue, sort) => {
  const searchedMovies = getSortedMoviesPages(movies, sort);

  return {
    type: actionTypes.FETCH_SEARCHED_MOVIES_SUCCESS,
    payload: {
      searchedMovies,
      searchValue,
      pagesCount: Object.keys(searchedMovies).length,
    },
  };
};

export const changeSearchedMoviesSortOrder = (movies, newSortOrder) => {
  const sortedMovies = getSortedMoviesPages(
    createMoviesRawArray(movies),
    newSortOrder
  );

  return {
    type: actionTypes.SET_SEARCHED_MOVIES_SORT_ORDER,
    payload: {
      sortedMovies,
    },
  };
};

export const setSearchFlag = (searchFlag) => ({
  type: actionTypes.SET_SEARCH_FLAG,
  payload: searchFlag,
});

export const fetchMoviesPending = () => ({
  type: actionTypes.FETCH_MOVIES_PENDING,
});

export const fetchMoviesFailed = () => ({
  type: actionTypes.FETCH_MOVIES_FAILED,
});

export const fetchMovieSuccess = () => ({
  type: actionTypes.FETCH_MOVIE_SUCCESS,
});

export const fetchMoviePending = () => ({
  type: actionTypes.FETCH_MOVIE_PENDING,
});

export const fetchMovieFailed = () => ({
  type: actionTypes.FETCH_MOVIE_FAILED,
});

// Async Function Handlers -----------------------------------------------------------------------------------------

export const fetchAllMoviesHandler = async (dispatch, sort, newPage) => {
  dispatch(fetchMoviesPending());

  try {
    const { results, total_pages } = await fetchAllMovies(sort, newPage);
    dispatch(fetchedAllMoviesSuccess(results, total_pages));
    return "Success";
  } catch (error) {
    dispatch(fetchMoviesFailed());
    return error;
  }
};

export const fetchSearchedMoviesHandler = async (
  dispatch,
  searchValue,
  sort
) => {
  dispatch(fetchMoviesPending());

  try {
    const movies = await fetchSearchedMovies(searchValue);
    dispatch(fetchedSearchedMoviesSuccess(movies, searchValue, sort));
    return "Success";
  } catch (error) {
    dispatch(fetchMoviesFailed());
    return error;
  }
};

export const fetchMovieByIdHandler = async (dispatch, movieID) => {
  dispatch(fetchMoviePending());

  try {
    const movie = await fetchMovie(movieID);
    dispatch(fetchMovieSuccess());
    return movie;
  } catch (error) {
    dispatch(fetchMovieFailed());
    return error;
  }
};
