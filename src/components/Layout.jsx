import React, { createRef, useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Context } from "src/context";
import { useWindowHeightWithDebounce } from "src/util/hooks";
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
  const footerRef = createRef();

  const handleMenuBarClick = useCallback(
    _value => _event => {
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
    [isMenuOpen]
  );

  const windowHeight = useWindowHeightWithDebounce(300); // get the window height.

  // Relocate the footer to the bottom of the window if there is no scrollbar.
  useEffect(() => {
    if (footerRef.current && mainContainerRef.current) {
      const hasScrollBar =
        windowHeight <
        mainContainerRef.current.clientHeight + footerRef.current.clientHeight;

      if (!hasScrollBar) {
        footerRef.current.style.position = "fixed";
        footerRef.current.style.bottom = "0";
        footerRef.current.style.left = "0";
        footerRef.current.style.right = "0";
      } else {
        footerRef.current.style.position = "relative";
      }
    }
  }, [mainContainerRef.current, footerRef.current, windowHeight]);

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
          tabindex={0}
        />
        <Menu toggleMenu={handleMenuBarClick} ref={menuRef} />
        <div className={style.bodyContainer}>{children}</div>
      </div>
      <Footer ref={footerRef} />
    </MuiThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
