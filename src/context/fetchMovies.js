import { get } from "~/services/http";
import { sortOrders } from "./moviesSlice";

// send request to api for fetch a movie by id
export const fetchMovie = async (movieId) => {
  return (
    await get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    )
  ).data;
};

// send request to api in all movies format
export const fetchAllMovies = async (sortOrder, pageNum) => {
  return (
    await get(
      `movie/${sortOrder}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&page=${pageNum}`
    )
  ).data;
};

// send request to api in search format
const getSearchMovies = async (movieTitle, pageNum) => {
  return (
    await get(
      `search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${movieTitle}&page=${pageNum}`
    )
  ).data;
};

// create the final object of movie results (every key of obgect is page number and values of each key is an array with max-length =>20 )
const createMoviesPagesObj = (totalResults) => {
  const resultsCount = totalResults.length;
  const pages = {};
  const pagesCount =
    parseInt(resultsCount / 20) + (resultsCount % 20 > 0 ? 1 : 0);

  for (let i = 1; i <= pagesCount; i++) {
    pages[i] = totalResults.splice(0, 20);
  }

  return pages;
};

// requset to api and return data
const getSearchMovieData = async (title) => {
  const firstPageData = await getSearchMovies(title, "1");

  let unresolvePromises = [];

  for (let i = 1; i < firstPageData.total_pages; i++) {
    unresolvePromises.push(getSearchMovies(title, i + 1));
  }

  return {
    resolvedData: (await Promise.all(unresolvePromises)).map((data) => data),
    pagesInfo: firstPageData,
  };
};

export const fetchSearchedMovies = async (movieTitle) => {
  const { resolvedData, pagesInfo } = await getSearchMovieData(movieTitle);

  let totalResults = [...pagesInfo.results];
  for (let index = 0; index < resolvedData.length; index++) {
    totalResults.push(...(await resolvedData[index]).results);
  }

  return totalResults;
};

export const createMoviesRawArray = (moviesObj) => {
  let rawArray = [];
  for (const page in moviesObj) {
    rawArray.push(...moviesObj[page]);
  }

  return rawArray;
};

// sortParam = popularity || vote_average (for search mode)
export const getSortedMoviesPages = (moviesArr, sortParam) => {
  const sort =
    sortParam === sortOrders.POPULARITY ? "popularity" : "vote_average";

  const sortedResults = moviesArr.sort((a, b) => b[sort] - a[sort]);

  const pages = createMoviesPagesObj(sortedResults);

  return pages;
};
