import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

import Footer from "./footer";
import Menu from "./menu";

import "../styles/index.scss";
import style from "./layout.module.scss";

// Create a context for menu bar status.
// This is just to maintain the menu bar open status even when <Layout /> gets reconstructed,
// So there is no need to globally provide this context.
const MenuBarStatusContext = createContext();

/**
 * The very fundamental layout component for the application.
 */
const Layout = ({ children }) => {
  const [open, toggleOpen] = useState(true);

  /**
   * On click handler for Menu button.
   */
  const handleMenuBarClick = value => event => toggleOpen(!open);

  return (
    <MenuBarStatusContext.Provider value={{ open, toggleOpen }}>
      <Menu toggleMenu={handleMenuBarClick} isMenuOpen={open} />
      <div className={open ? style.shiftToLeft : style.shiftToRight}>
        {children}
        <Footer />
      </div>
    </MenuBarStatusContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
