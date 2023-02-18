import MovieGenres from "./MovieGenres";
import MovieLangs from "./MovieLangs";
import MovieYear from "./MovieYear";

export default function MovieInfo({ movieInfo }) {
  return (
    <div className="info-wrapper d-flex flex-column justify-content-around py-2 pt-4 ps-4 ps-md-2 pe-md-3">
      <div className="title text-white">
        <h2>{movieInfo.title}</h2>
      </div>
      <div className="vote mt-1">
        <i className="fa fa-star"></i>
        <span className="ms-1 text-white">
          {Number(movieInfo.vote_average).toFixed(1)}
        </span>
      </div>
      <div className="info mt-2">
        <MovieGenres movieGenres={movieInfo.genres} />
        <MovieYear releaseDate={movieInfo.release_date} />
        <MovieLangs movieLangs={movieInfo.spoken_languages} />
      </div>
      <div className="overview mt-3">
        <p className="text-white">{movieInfo.overview}</p>
      </div>
    </div>
  );
}
