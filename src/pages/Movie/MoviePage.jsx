import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMovieDispatcherContext,
  useMovieStateContext,
} from "~/context/store";
import {
  moviesStatusTypes,
  fetchMovieByIdHandler,
} from "~/context/moviesSlice";
import useErrorHandler from "~/hooks/useErrorHandler";
import MoviePoster from "./components/MoviePoster";
import MovieInfo from "./components/MovieInfo";
import Loader from "../Loader";
import defaultBgPoster from "~/images/default-bg-poster.jpg";
import defaultPoster from "~/images/default-poster.jpg";
import "./style.scss";

export default function MoviePage() {
  const { status } = useMovieStateContext();
  useErrorHandler(status);

  const movie = useFetchMovie();
  const backgroundPoster =
    movie && movie.backdrop_path
      ? `url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`
      : `url(${defaultBgPoster})`;

  return (
    <>
      {status === moviesStatusTypes.Success ? (
        movie && (
          <section
            id="movie-info"
            className="container-fluid d-flex justify-content-center mt-5 pt-2"
          >
            <div className="wrapper position-relative p-0 mb-5 mb-md-0">
              <div
                className="layout position-absolute w-100 h-100"
                style={{ backgroundImage: backgroundPoster }}
              ></div>
              <div className="row g-0 body-wrapper">
                <div className="col-12 col-md-4 col-lg-3">
                  <MoviePoster
                    posterPath={
                      movie.poster_path
                        ? `http://image.tmdb.org/t/p/original/${movie.poster_path}`
                        : defaultPoster
                    }
                  />
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  <MovieInfo movieInfo={movie} />
                </div>
              </div>
            </div>
          </section>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

function useFetchMovie() {
  let { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    fetchMovieByIdHandler(dispatch, movieId).then((data) => setMovie(data));
  }, [dispatch, movieId]);

  return movie;
}
