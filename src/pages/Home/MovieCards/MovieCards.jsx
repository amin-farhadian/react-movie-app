import { useSearchParams } from "react-router-dom";
import { searchParameters } from "~/router";
import Card from "./Card";
import defaultPoster from "~/images/default-poster.jpg";

export default function MovieCards({ moviesList }) {
  let [searchParams] = useSearchParams();
  const pageNum = searchParams.get(searchParameters.PAGE_NUM) || "1";

  let movies = "";
  if (moviesList !== undefined) {
    // see if we are in search mode, create an array for movies based on page number
    let moviesArr = [];
    Array.isArray(moviesList)
      ? (moviesArr = moviesList)
      : (moviesArr = moviesList[pageNum]);

    try {
      movies = moviesArr
        ? moviesArr.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              poster={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultPoster
              }
              title={
                movie.title.length <= 50
                  ? movie.title
                  : `${movie.title.substr(0, 45)}...`
              }
              vote={movie.vote_average}
            />
          ))
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  return <div className="row">{movies}</div>;
}
