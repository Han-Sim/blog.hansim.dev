import React, { createRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Footer from "./footer";
import Menu from "./menu";
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

  const handleElsewhereClick = useCallback(() => {
    open && toggleOpen(false);
  }, [toggleOpen, open]);

  const handleElsewhereOnKeyDown = useCallback(
    event => {
      if (open && event.keyCode === 13) {
        toggleOpen(false);
      }
    },
    [toggleOpen, open]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={
          open ? style.layer : classnames(style.layer, style.layerHidden)
        }
        onClick={handleElsewhereClick}
        onKeyDown={handleElsewhereOnKeyDown}
        role="button"
        aria-label="Close the sidebar"
        tabindex={0}
      />
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
