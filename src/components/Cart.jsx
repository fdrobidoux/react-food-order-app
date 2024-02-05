import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/cart-context";

export default function Cart({ onClick, ...props }) {
  const { meals } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(function() {
    if (!meals) {
      setCartQuantity(0);
    } else {
      setCartQuantity(meals.length);
    }
  }, [meals]);

  return <button className="button" onClick={onClick} {...props}>
    Cart ({cartQuantity})
  </button>;
}