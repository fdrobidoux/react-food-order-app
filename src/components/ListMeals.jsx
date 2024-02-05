import MealItem from "./MealItem";
import { useContext, useEffect } from "react";
import { FoodMenuContext } from "../store/food-menu-context";
import { CartContext } from "../store/cart-context";

export default function ListMeals({ ...props }) {
  const { foodMenu, foodMenuFetchingError, isFetchingFoodMenu } = useContext(FoodMenuContext);
  const { addMealToCart } = useContext(CartContext);

  if (foodMenuFetchingError !== null) {
    return <div {...props}>
      <p>An error occured getting the food menu.</p>
    </div>;
  }

  function handleAddToCart(id) {
    addMealToCart(id);
  }

  return <div {...props}>
    {isFetchingFoodMenu && <p className="fallback-text">Loading...</p>}
    {!isFetchingFoodMenu && foodMenu.length === 0 && <p>No meals.</p>}
    {!isFetchingFoodMenu && foodMenu.length > 0 && 
      foodMenu.map((meal, i) => (
        <MealItem key={meal.id} className="meal-item" addToCartHandle={handleAddToCart} {...meal} />
      ))
    }
  </div>;
}