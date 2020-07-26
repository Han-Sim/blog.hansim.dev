import React, { createContext, useState } from "react";
import { CATEGORY_WEB_DEVELOPMENT } from "src/util/constants";

const Context = createContext();

const ContextProvider = props => {
  const [activeMenu, setActiveMenu] = useState(CATEGORY_WEB_DEVELOPMENT);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
