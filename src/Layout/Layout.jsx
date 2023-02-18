import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <div className="col-12 pt-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
