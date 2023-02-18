import { useRef } from "react";
import SearchForm from "../SearchForm";
import "./style.scss";

export default function ModalSearch() {
  const closeModalRef = useRef();

  const hideModal = () => closeModalRef.current.click();

  return (
    <>
      <i
        className="search-icon fas fa-search d-lg-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      ></i>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-wrapper">
            <button
              type="button"
              className="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeModalRef}
            >
              <i className="fa fa-remove"></i>
            </button>
            <SearchForm additionalAction={hideModal} />
          </div>
        </div>
      </div>
    </>
  );
}
