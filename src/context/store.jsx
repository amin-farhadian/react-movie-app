import { createContext, useReducer, useContext } from "react";
import { moviesStatusTypes, reducer } from "./moviesSlice";

function useContextProducer(initContext) {
  const context = useContext(initContext);

  if (!context) {
    throw new Error("Context can't be used without a provider!");
  }

  return context;
}

const moviesStateContext = createContext();

const moviesDispatcherContext = createContext();

export const useMovieStateContext = () => {
  return useContextProducer(moviesStateContext);
};

export const useMovieDispatcherContext = () => {
  return useContextProducer(moviesDispatcherContext);
};

export function MovieAppProvider({ children }) {
  const initState = {
    status: moviesStatusTypes.Idle,
    searchFlag: false,
    totalPages: 0,
    entities: {},
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <moviesStateContext.Provider value={state}>
      <moviesDispatcherContext.Provider value={dispatch}>
        {children}
      </moviesDispatcherContext.Provider>
    </moviesStateContext.Provider>
  );
}
