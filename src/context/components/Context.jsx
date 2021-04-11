import React, { createContext, useState, useEffect } from "react";
import { CATEGORY_ALL_POSTS } from "src/util/constants";

const Context = createContext();

const ContextProvider = props => {
  const [activeMenu, setActiveMenu] = useState(CATEGORY_ALL_POSTS);
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
