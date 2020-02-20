import React from "react";
import PropTypes from "prop-types";

import Footer from "./footer";
import Menu from "./menu";

import "../styles/index.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <Menu />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
