import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Context.Provider
      value={{
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
