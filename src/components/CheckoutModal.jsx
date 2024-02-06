import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";
import { createOrder } from "../utils/backendFetch";

const CheckoutModal = forwardRef(function Modal({ title, nextModal }, ref) {
  const dialog = useRef();

  const { meals, totalPrice, clearCart } = useContext(CartContext);

  const [isSendingData, setIsSendingData] = useState(false);
  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => {
    return {
      ...ref.current,
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting...");
    setError(null);
    setIsSendingData(true);

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    createOrder({
      order: {
        items: meals,
        customer: data
      }
    }).then((response) => {
      console.log("Submitted.");
      if (response.ok === true) {
        setIsSendingData(false);
        clearCart();
        dialog.current.close();
        nextModal.current.open();
      } else {
        setError(new Error(
          "Error code " 
          + response.status 
          + ". Message given : "
          + (response.json.message ?? "None.")
        ));
      }
    });
  }

  function handleClose(e) {
    dialog.current.close();
  }

  return createPortal(
    <dialog className="modal" id="checkout-modal" ref={dialog}>
      <h2>{title}</h2>
      {error && <p style={{color: "red"}}>{error.message}</p>}
      <form method="dialog" id="checkout-form" onSubmit={handleSubmit}>
        <p>Total Amount: ${totalPrice}</p>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input type="email" name="email" />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" name="street" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" name="postal-code" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button" type="button" onClick={handleClose}>Close</button>
          <button className="button" type="submit">Submit Order</button>
        </div>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CheckoutModal;