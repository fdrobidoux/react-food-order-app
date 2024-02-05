import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CheckoutModal = forwardRef(function Modal({ title, prevModal }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleClickBack(e) {
    e.preventDefault();
    dialog.current.close();
    prevModal.current.open();
  }

  function handleSubmit(e) {
    console.log("Submitted.");
  }

  function handleClose(e) {
    dialog.current.close();
  }

  return createPortal(
    <>
      <dialog className="modal" id="checkout-modal" ref={dialog}>
        <h2>{title}</h2>
        <form method="dialog" id="checkout-form" onSubmit={handleSubmit}>
          
          <div className="modal-actions">
            <button className="text-button" type="button" onClick={handleClose}>Close</button>
            <button className="button" type="submit">Submit Order</button>
          </div>
        </form>
      </dialog>
    </>,
    document.getElementById('modal')
  );
});

export default CheckoutModal;