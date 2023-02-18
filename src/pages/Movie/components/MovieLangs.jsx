export default function MovieLangs({ movieLangs }) {
  let langs = "";
  movieLangs.forEach((lang) => {
    langs += ` ${lang["iso_639_1"]}  ,`;
  });
  langs = langs.substring(0, langs.length - 1); // delete last ','

  return (
    <div className="lang my-1">
      <span className="info-lable">
        <i className="fa fa-language"></i>
        <span className="ms-1">Language :</span>
      </span>
      <span className="info-value ms-1 text-white">{langs}</span>
    </div>
  );
}
