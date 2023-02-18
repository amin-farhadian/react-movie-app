import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { paths } from "./router";
import Layout from "./Layout";
import Loader from "./pages/Loader";

const NotFoundPage = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/Error"));
const HomePage = lazy(() => import("./pages/Home"));
const MoviePage = lazy(() => import("./pages/Movie"));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path={paths.HOME} element={<HomePage />} />
          <Route path={paths.MOVIE} element={<MoviePage />} />
          <Route path={paths.ERROR} element={<ErrorPage />} />
          <Route path={paths.NOT_FOUND} element={<NotFoundPage />} />
          <Route
            path="*"
            element={<Navigate to={paths.NOT_FOUND} replace />}
          />
        </Route>
      </Routes>
    </>
  );
}

function LayoutWrapper() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}
