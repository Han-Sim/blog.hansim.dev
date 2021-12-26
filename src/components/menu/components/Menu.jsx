import React, { useContext } from "react";
import { navigate } from "gatsby";
import classnames from "classnames";
import { KEY_ENTER, PATH_ALL_POSTS } from "src/util/constants";
import { Context } from "src/context";
import style from "./menu.module.scss";

// TODO: hide it when scroll down if the screen height is small.
const Menu = () => {
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } = useContext(Context);

  return (
    <>
      <div className={style.menuContainer}>
        <div
          className={style.logo}
          onClick={() => {
            navigate(PATH_ALL_POSTS);
          }}
          onKeyDown={event => {
            if (event.keyCode === KEY_ENTER) {
              navigate(PATH_ALL_POSTS);
            }
          }}
          role="button"
          tabIndex={0}
        >
          HANSIM.DEV.
        </div>
      </div>
      {/* Fixed position in order to set z-index to float it on top of drawer menu */}
      <div
        className={
          isMenuDrawerOpen
            ? classnames(style.hamburgerMenuIcon, style.hamburgerMenuIconOpen)
            : style.hamburgerMenuIcon
        }
        onClick={() => {
          setIsMenuDrawerOpen(!isMenuDrawerOpen);
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
