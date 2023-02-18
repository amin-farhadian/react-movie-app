import "./style.scss";

export default function Button({
  title,
  classValue = "",
  idValue = "",
  clickHandler,
}) {
  return (
    <button
      id={idValue}
      className={`button ${classValue}`}
      onClick={clickHandler}
    >
      <span>{title}</span>
    </button>
  );
}
