import { useRef } from "react";

import Cart from "./Cart";
import CheckoutModal from "./CheckoutModal";
import CartModal from "./CartModal";


export default function Header() {
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();

  function onClickCart() {
    cartModalRef.current.open();
  }

  return <>
    <CartModal
      ref={cartModalRef}
      title="Your Cart"
      nextModal={checkoutModalRef}
    />
    <CheckoutModal
      ref={checkoutModalRef}
      title="Checkout"
      prevModal={cartModalRef}
      />
    <div id="main-header">
      <h1 id="title"><img src="./logo.jpg" />REACTFOOD</h1>
      <Cart onClick={onClickCart} />
    </div>
  </>
}