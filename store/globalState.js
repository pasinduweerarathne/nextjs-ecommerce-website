import { createContext, useEffect, useReducer } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [] };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");

        dispatch({
          type: "AUTH",
          payload: { payload: res.access_token, user: res.user },
        });
      });
    }
  }, []);

  useEffect(() => {
    const __next__cart01 = JSON.parse(localStorage.getItem("__next__cart01"));

    if (__next__cart01) dispatch({ type: "ADD_CART", payload: __next__cart01 });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next__cart01", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
