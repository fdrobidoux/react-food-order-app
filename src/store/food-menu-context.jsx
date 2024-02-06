import { createContext, useEffect, useState } from "react";
import { getMeals } from "../utils/backendFetch";
import { useFetch } from "../hooks/useFetch";


export const FoodMenuContext = createContext({
  foodMenu: [],
  foodMenuFetchingError: new Error(),
  isFetchingFoodMenu: false
});

export default function FoodMenuContextProvider({ children }) {
  const {
    fetchedData: foodMenu,
    error: foodMenuFetchingError,
    isFetching: isFetchingFoodMenu
  } = useFetch(getMeals, []);

  var ctxValue = {
    foodMenu,
    foodMenuFetchingError,
    isFetchingFoodMenu
  };

  return <FoodMenuContext.Provider value={ctxValue}>{children}</FoodMenuContext.Provider>
}