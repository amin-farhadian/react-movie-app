import Button from "../Button";
import "./style.scss";

export default function NextBtn({ clickHandler }) {
  return (
    <Button title="Next Page" idValue="next" clickHandler={clickHandler} />
  );
}
