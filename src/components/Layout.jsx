import React, { createRef, useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Context } from "src/context";
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
  const { isMenuOpen, setIsMenuOpen } = useContext(Context);

  const handleMenuBarClick = useCallback(
    value => event => {
      setIsMenuOpen(!isMenuOpen);
    },
    [isMenuOpen, setIsMenuOpen]
  );

  useEffect(() => {
    // Enable/disable the body level scroll-bar.
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isMenuOpen]);

  const menuRef = createRef();

  const handleElsewhereClick = useCallback(() => {
    isMenuOpen && setIsMenuOpen(false);
  }, [isMenuOpen, setIsMenuOpen]);

  const handleElsewhereOnKeyDown = useCallback(
    event => {
      if (isMenuOpen && event.keyCode === 13) {
        isMenuOpen(false);
      }
    },
    [isMenuOpen, isMenuOpen]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={
          isMenuOpen ? style.layer : classnames(style.layer, style.layerHidden)
        }
        onClick={handleElsewhereClick}
        onKeyDown={handleElsewhereOnKeyDown}
        role="button"
        aria-label="Close the sidebar"
        tabindex={0}
      />
      <Menu toggleMenu={handleMenuBarClick} ref={menuRef} />
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
