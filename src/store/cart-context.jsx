import { createContext, useState, useReducer } from "react";

export const CartContext = createContext({
  meals: [],
  addMealToCart: (id) => {},
  updateMealQuantity: (id, amount) => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_MEAL") {
    var updatedMeals = [...state.meals];
    
    const existingCartMealIndex = updatedMeals.findIndex(x => x.id === action.payload.id);
    const existingCartMeal = updatedMeals[existingCartMealIndex];

    if (existingCartMeal) {
      const updatedMeal = {
        ...existingCartMeal,
        quantity: existingCartMeal.quantity + 1,
      };
      updatedMeals[existingCartMealIndex] = updatedMeal; 
    }
    else {
      updatedMeals.push({
        id: action.payload.id,
        quantity: 1
      });
    }

    return {
      ...state,
      meals: updatedMeals
    };
  }
  else if (action.type === "UPDATE_MEAL") {
    const updatedMeals = [...state.meals];

    const existingCartMealIndex = updatedMeals.findIndex(x => x.id === action.payload.id);
    const existingCartMeal = updatedMeals[existingCartMealIndex];

    if (existingCartMeal) {
      let expectedNewQuantity = existingCartMeal.quantity + (action.payload.amount);
      if (expectedNewQuantity <= 0) {
        updatedMeals.splice(existingCartMealIndex, 1);
      } else {
        updatedMeals[existingCartMealIndex] = {
          ...existingCartMeal,
          quantity: expectedNewQuantity
        };
      }
      return {
        ...state,
        meals: updatedMeals
      };
    } else {
      throw new Error("Item didn't exist in cart.");
    }
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    { meals: [] }
  );

  function addToCart(id) {
    cartDispatch({ 
      type: "ADD_MEAL", 
      payload: { id }
    });
  }

  function updateCartQuantity(id, amount) {
    cartDispatch({
      type: "UPDATE_MEAL",
      payload: { id, amount }
    });
  }

  const ctxValue = {
    meals: cartState.meals,
    addMealToCart: addToCart,
    updateMealQuantity: updateCartQuantity
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}