import React, {
  createContext,
  createRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Menu from "./menu";

import "../styles/index.scss";
import style from "./layout.module.scss";

// Create a context for menu bar status.
// This is just to maintain the menu bar open status even when <Layout /> gets reconstructed,
// So there is no need to globally provide this context.
const MenuBarStatusContext = createContext();

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

  const menuRef = createRef();

  let prevScrollpos = window.pageYOffset;
  const handleScroll = () => {
    if (menuRef.current && window.innerWidth <= 760) {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        menuRef.current.style.top = "0";
      } else {
        menuRef.current.style.top = "-52px";
      }
      prevScrollpos = currentScrollPos;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {open && <div className={style.layer} onClick={handleElsewhereClick} />}
      <MenuBarStatusContext.Provider value={{ open, toggleOpen }}>
        <Menu toggleMenu={handleMenuBarClick} isMenuOpen={open} ref={menuRef} />
        <div className={style.container}>
          {children}
          <Footer />
        </div>
      </MenuBarStatusContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
