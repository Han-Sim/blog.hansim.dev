import React, { createRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Footer from "./Footer";
import Menu from "./menu";
import "src/styles/index.scss";
import style from "./layout.module.scss";

const colorBlue = "#00539c";
const colorSoybean = "#343148";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorBlue,
    },
    secondary: {
      main: colorSoybean,
    },
  },
});

/**
 * The very fundamental layout component for the application.
 */
const Layout = ({ children }) => {
  const [open, toggleOpen] = useState(false);

  const handleElsewhereClick = useCallback(() => {
    open && toggleOpen(false);
  }, [toggleOpen, open]);

  const handleMenuBarClick = useCallback(
    value => event => {
      toggleOpen(!open);
    },
    [toggleOpen, open]
  );

  useEffect(() => {
    // Enable/disable the body level scroll-bar.
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);

  const menuRef = createRef();

  return (
    <MuiThemeProvider theme={theme}>
      {open && (
        <div
          className={style.layer}
          onClick={handleElsewhereClick}
          role="button"
          aria-label="Close the sidebar"
          tabindex={0}
        />
      )}
      <Menu toggleMenu={handleMenuBarClick} isMenuOpen={open} ref={menuRef} />
      <div className={style.bodyContainer}>
        {children}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
