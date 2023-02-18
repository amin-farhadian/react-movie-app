import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      id="loading"
      className="d-flex justify-content-center align-items-center"
      style={{ height: "75vh" }}
    >
      <ThreeDots
        height={150}
        width={150}
        color="#007bff"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
