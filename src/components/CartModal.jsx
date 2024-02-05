import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CartContext } from "../store/cart-context";
import { FoodMenuContext } from "../store/food-menu-context";

const CartModal = forwardRef(function Modal({ title, nextModal }, ref) {
  const { foodMenu } = useContext(FoodMenuContext);
  const { meals, updateMealQuantity } = useContext(CartContext);

  const [mappedFood, setMappedFood] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dialog = useRef();
  
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      }
    };
  });

  function handleClickNext(e) {
    e.preventDefault();

    dialog.current.close();
    nextModal.current.open();
  };

  function handleQuantity(mealId, e) {
    updateMealQuantity(mealId, Number.parseInt(e.target.value));
  }

  function handleClose(e) {
    dialog.current.close();
  }

  useEffect(function() {
    console.log(meals);
    if (!meals || meals.length === 0) {
      setMappedFood([]);
      return;
    }
    setMappedFood(meals.map(x => {
      let mealData = foodMenu.find(y => y.id === x.id);
      if (mealData === null) {
        return mealData;
      }
      let quantity = x.quantity;
      return { ...mealData, quantity };
    }));
  }, [foodMenu, meals]);


  useEffect(function() {
    if (mappedFood.length === 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice(mappedFood.reduce((prev, x) => prev + (x.quantity * Number.parseFloat(x.price)), 0).toFixed(2));
    }
  }, [mappedFood]);
  
  return createPortal(
    <dialog className="modal" id="cart-modal" ref={dialog}>
      <h2>{title}</h2>
      <p>HELLO THERE</p>
      <ul>
        {mappedFood.map((food, i) => {
          return (
            <li className="cart-item" key={i}>
              <p>{food.name} - {food.quantity} x ${food.price}</p>
              <span className="cart-item-actions">
                <button type="button" value={-1} onClick={(e) => handleQuantity(food.id, e)}>-</button>
                {food.quantity}
                <button type="button" value={1} onClick={(e) => handleQuantity(food.id, e)}>+</button>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{totalPrice}</p>
      <div className="modal-actions">
        <button className="button text-button" type="button" onClick={handleClose}>Close</button>
        <button className="button" type="button" onClick={handleClickNext}>Go to Checkout</button>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;