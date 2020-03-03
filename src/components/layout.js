import React, { useState } from "react";
import PropTypes from "prop-types";

import Footer from "./footer";
import Menu from "./menu";

import "../styles/index.scss";
import style from "./layout.module.scss";

const Layout = ({ children }) => {
  // TODO: this has to be a react context to be a cached value.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * On click handler for Menu button.
   */
  const toggleMenu = (value) => event => {
    setIsMenuOpen(value);
  };

  return (
    <>
      <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className={isMenuOpen ? style.shiftToLeft : style.shiftToRight}>
        {children}
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
