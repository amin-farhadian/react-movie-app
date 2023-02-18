export default function MoviePoster({ posterPath }) {
  return (
    <div className="poster-wrapper d-flex justify-content-center justify-content-md-start ms-md-3 pt-3">
      <img src={posterPath} alt="poster" className="d-block" />
    </div>
  );
}
