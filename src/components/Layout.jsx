import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useWindowHeightWithDebounce } from "src/util/hooks";
import Footer from "./footer";
import Menu from "./menu";
import MenuDrawer from "./menuDrawer";
import GlobalStyle from "./styled/globalStyle";
import theme from "./styled/theme";
import { MainContainer } from "./layout.styled";

/**
 * The very fundamental layout component for the application.
 */
const Layout = ({ children }) => {
  const divRef = useRef();
  const footerRef = useRef();

  const windowHeight = useWindowHeightWithDebounce(300); // get the window height.

  // Relocate the footer to the bottom of the window if there is no scrollbar.
  useEffect(() => {
    if (footerRef.current && divRef.current) {
      const hasScrollBar =
        windowHeight <
        divRef.current.clientHeight + footerRef.current.clientHeight;

      if (!hasScrollBar) {
        footerRef.current.style.position = "fixed";
        footerRef.current.style.bottom = "0";
        footerRef.current.style.left = "0";
        footerRef.current.style.right = "0";
      } else {
        footerRef.current.style.position = "relative";
      }
    }
  }, [divRef, footerRef, windowHeight]);

  return (
    <ThemeProvider theme={theme}>
      <MenuDrawer />
      <div ref={divRef}>
        <Menu />
        <MainContainer>{children}</MainContainer>
      </div>
      <Footer ref={footerRef} />
      <GlobalStyle />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
