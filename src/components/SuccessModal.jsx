import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const SuccessModal = forwardRef(function Modal({ title }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      ...ref.current,
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal" id="checkout-modal" ref={dialog}>
      <h1>{title}</h1>
      <p>Your order was submitted successfully.</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <div className="modal-actions">
        <button type="button" className="button" onClick={() => dialog.current.close()}>Okay</button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default SuccessModal;