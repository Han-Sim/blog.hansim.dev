import React from "react";
import PropTypes from "prop-types";

import Footer from "./footer";
import Menu from "./menu";

import "../styles/index.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div id="content">
        <Menu />
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
