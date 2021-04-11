import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { CATEGORY_ALL_POSTS } from "src/util/constants";

const Context = createContext();

const ContextProvider = ({ children }) => {
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
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export { Context, ContextProvider };
