import React, { forwardRef, useContext, useEffect, useCallback } from "react";
import { navigate } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import { Context } from "../../../context";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classnames from "classnames";
import {
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
} from "../../../util/constants";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((props, ref) => {
  const { activeMenu, setActiveMenu } = useContext(Context);

  const HandleMenuOnClick = useCallback(
    menu => {
      setActiveMenu(menu);
      navigate(`/all-posts`);
    },
    [setActiveMenu]
  );

  return (
    <div className={style.container} ref={ref}>
      <div className={style.left}>
        {/* <IconButton href="/" title="Latest Post">
          <HomeIcon
            classes={{
              root: style.homeIcon,
            }}
          />
        </IconButton> */}
        <div
          className={
            activeMenu === CATEGORY_WEB_DEVELOPMENT
              ? classnames(style.menu, style.menuActive, style.webDevelopment)
              : classnames(style.menu, style.menuInactive, style.webDevelopment)
          }
          onClick={() => HandleMenuOnClick(CATEGORY_WEB_DEVELOPMENT)}
        >
          {CATEGORY_WEB_DEVELOPMENT}
        </div>
        <div
          className={
            activeMenu === CATEGORY_BASICS
              ? classnames(style.menu, style.menuActive, style.basics)
              : classnames(style.menu, style.menuInactive, style.basics)
          }
          onClick={() => HandleMenuOnClick(CATEGORY_BASICS)}
        >
          {CATEGORY_BASICS}
        </div>
      </div>
      <div>
        <IconButton onClick={props.onClick(true)}>
          <MenuOpenIcon
            classes={{
              root: style.menuOpenIcon,
            }}
          />
        </IconButton>
      </div>
    </div>
  );
});

export default MenuBar;
