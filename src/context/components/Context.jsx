import React, { createContext, useState } from "react";
import { CATEGORY_WEB_DEVELOPMENT } from "../../util/constants";

const Context = createContext();

const ContextProvider = props => {
  const [activeMenu, setActiveMenu] = useState(CATEGORY_WEB_DEVELOPMENT);

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
