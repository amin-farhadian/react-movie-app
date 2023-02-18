import { useSearchParams } from "react-router-dom";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "~/context/store";
import { fetchAllMoviesHandler, sortOrders } from "~/context/moviesSlice";
import { searchParameters } from "~/router";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";

export default function Buttons() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { totalPages } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const searchValue = searchParams.get(searchParameters.SEARCH_QUERY);
  const pageNum = searchParams.get(searchParameters.PAGE_NUM) || "1";
  const sortOrder =
    searchParams.get(searchParameters.SORT_ORDER) || sortOrders.NEWEST;

  const changePageHandler = async (type) => {
    const newPage = type === "next" ? Number(pageNum) + 1 : Number(pageNum) - 1;

    if (!searchValue) {
      await fetchAllMoviesHandler(dispatch, sortOrder, newPage);
    }

    searchParams.append(searchParameters.PAGE_NUM, newPage);
    const params = Object.fromEntries([...searchParams]);
    setSearchParams(params);

    window.scrollTo(0, 0);
  };

  return (
    <div className="btns-container d-flex justify-content-center mt-4">
      {pageNum > 1 && (
        <PrevBtn
          clickHandler={() => {
            changePageHandler("prev");
          }}
        />
      )}
      {pageNum < totalPages && (
        <NextBtn
          clickHandler={() => {
            changePageHandler("next");
          }}
        />
      )}
    </div>
  );
}
