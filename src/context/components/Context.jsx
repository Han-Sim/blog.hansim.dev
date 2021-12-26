import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        isMenuDrawerOpen,
        setIsMenuDrawerOpen,
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
