import React, { createRef, useCallback, useContext } from "react";
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
  const mainContainerRef = createRef();
  const menuRef = createRef();

  const handleMenuBarClick = useCallback(
    _value => _event => {
      setIsMenuOpen(!isMenuOpen);
    },
    [isMenuOpen, setIsMenuOpen]
  );

  const handleElsewhereClick = useCallback(() => {
    isMenuOpen && setIsMenuOpen(false);
  }, [isMenuOpen, setIsMenuOpen]);

  const handleElsewhereOnKeyDown = useCallback(
    event => {
      if (isMenuOpen && event.keyCode === 13) {
        isMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div ref={mainContainerRef}>
        <div
          className={
            isMenuOpen
              ? style.layer
              : classnames(style.layer, style.layerHidden)
          }
          onClick={handleElsewhereClick}
          onKeyDown={handleElsewhereOnKeyDown}
          role="button"
          aria-label="Close the sidebar"
          tabIndex={0}
        />
        <Menu toggleMenu={handleMenuBarClick} ref={menuRef} />
        <div className={style.bodyContainer}>{children}</div>
      </div>
      <Footer />
    </MuiThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
