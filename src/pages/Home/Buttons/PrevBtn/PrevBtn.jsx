import Button from "../Button";
import "./style.scss";

export default function PrevBtn({ clickHandler }) {
  return (
    <Button title="Prev Page" idValue="prev" clickHandler={clickHandler} />
  );
}
