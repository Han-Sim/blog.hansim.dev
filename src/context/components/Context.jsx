import React, { createContext, useReducer } from "react";
import { useState } from "react";

const Context = createContext();

const ContextProvider = props => {
  const [activeMenu, setActiveMenu] = useState();

  return (
    <Context.Provider
      value={{
        activeMenu,
        setActiveMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };

// Reference:
// https://dev.to/oieduardorabelo/react-hooks-how-to-create-and-update-contextprovider-1f68
