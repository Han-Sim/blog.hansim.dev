import React, { createContext, useReducer } from "react";

const Context = createContext();

const initialState = {
  activeMenu: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setActiveMenu":
      return { ...state, activeMenu: action.payload };
  }
};

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };

// Reference:
// https://dev.to/oieduardorabelo/react-hooks-how-to-create-and-update-contextprovider-1f68
