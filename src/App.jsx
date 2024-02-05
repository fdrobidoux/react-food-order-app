import { useRef, useState } from "react";
import ListMeals from "./components/ListMeals";
import CartContextProvider from "./store/cart-context";
import FoodMenuContextProvider from "./store/food-menu-context";
import Header from "./components/Header";

function App() {
  return (
    <FoodMenuContextProvider>
      <CartContextProvider>
        <Header />
        <ListMeals id="meals" />
      </CartContextProvider>
    </FoodMenuContextProvider>
  );
}

export default App;
