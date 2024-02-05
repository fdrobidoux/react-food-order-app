import { createContext, useEffect, useState } from "react";

export const CheckoutContext = createContext({

});

export default function CheckoutContextProvider({ children }) {


  var ctxValue = {
    
  };

  return <CheckoutContext.Provider value={ctxValue}>{ children }</CheckoutContext.Provider>;
} 