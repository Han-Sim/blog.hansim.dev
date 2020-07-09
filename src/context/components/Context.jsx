import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const ContextProvider = props => {
  const [activeMenu, setActiveMenu] = useState("test");

  useEffect(() => {
    console.log("activeMenu", activeMenu);
  }, [activeMenu]);

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
