export default function MovieYear({ releaseDate }) {
  const movieYear = releaseDate.substring(0, 4);

  return (
    <div className="release-year my-1">
      <span className="info-lable">
        <i className="fa fa-calendar-o"></i>
        <span className="ms-1">Release Year :</span>
      </span>
      <span className="info-value ms-1 text-white">{movieYear}</span>
    </div>
  );
}
