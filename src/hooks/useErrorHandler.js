import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "~/router";
import { moviesStatusTypes } from "~/context/moviesSlice";

export default function useErrorHandler(status) {
  const navigate = useNavigate();

  useEffect(() => {
    if (status === moviesStatusTypes.Error) {
      navigate(paths.ERROR, { replace: false });
    }
  }, [navigate, status]);
}
