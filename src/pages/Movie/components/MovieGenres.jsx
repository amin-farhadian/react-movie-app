export default function MovieGenres({ movieGenres }) {
  let genres = "";
  movieGenres.forEach((genre) => {
    genres += ` ${genre.name} -`;
  });
  genres = genres.substring(0, genres.length - 1); // delete last '-'
  
  return (
    <div className="genres my-1">
      <span className="info-lable">
        <i className="fa fa-folder-open-o"></i>
        <span className="ms-1">Genere :</span>
      </span>
      <span className="info-value ms-1 text-white">{genres}</span>
    </div>
  );
}
