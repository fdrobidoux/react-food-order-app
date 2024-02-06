import { useRef } from "react";

import Cart from "./Cart";
import CheckoutModal from "./CheckoutModal";
import CartModal from "./CartModal";
import SuccessModal from "./SuccessModal";


export default function Header() {
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();
  const successModalRef = useRef();

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
      nextModal={successModalRef}
    />
    <SuccessModal ref={successModalRef} title="Success!" />
    <div id="main-header">
      <h1 id="title"><img src="./logo.jpg" />REACTFOOD</h1>
      <Cart onClick={onClickCart} />
    </div>
  </>
}