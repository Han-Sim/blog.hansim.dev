import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MetaTags from "react-meta-tags";
import { useWindowHeightWithDebounce } from "src/util/hooks";
import Footer from "./footer";
import Menu from "./menu";
import MenuDrawer from "./menuDrawer";
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
  const mainContainerRef = useRef();
  const footerRef = useRef();

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
  }, [mainContainerRef, footerRef, windowHeight]);

  return (
    <>
      <MetaTags>
        <meta name="theme-color" content="#292929" />
      </MetaTags>
      <MuiThemeProvider theme={theme}>
        <MenuDrawer />
        <div ref={mainContainerRef}>
          <Menu />
          <div className={style.bodyContainer}>{children}</div>
        </div>
        <Footer ref={footerRef} />
      </MuiThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
