import React, { useContext } from "react";
import classnames from "classnames";
import { Context } from "src/context";
import style from "./menu.module.scss";

// TODO: hide it when scroll down if the screen height is small.
const Menu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(Context);

  // TODO: update logo with actual icon.
  return (
    <>
      <div className={style.menuContainer}>
        <div className={style.logo}>
          <a href="/posts">Han Sim.</a>
        </div>
      </div>
      {/* Fixed position in order to set z-index to float it on top of drawer menu */}
      <div
        className={
          isMenuOpen
            ? classnames(style.hamburgerMenuIcon, style.hamburgerMenuIconOpen)
            : style.hamburgerMenuIcon
        }
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Menu;
