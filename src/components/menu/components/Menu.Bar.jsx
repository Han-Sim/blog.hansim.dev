import React, { forwardRef, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Context } from "../../../context";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classnames from "classnames";
import {
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
} from "../../../util/constants";
import { slugify } from "../../../util/helperFunctions";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((props, ref) => {
  const { activeMenu, setActiveMenu } = useContext(Context);

  useEffect(() => {
    console.log(activeMenu);
  }, [activeMenu]);

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
        <a href={`/category/${slugify(CATEGORY_WEB_DEVELOPMENT)}`}>
          <div
            className={
              activeMenu === CATEGORY_WEB_DEVELOPMENT
                ? classnames(style.menu, style.menuActive, style.webDevelopment)
                : classnames(
                    style.menu,
                    style.menuInactive,
                    style.webDevelopment
                  )
            }
          >
            {CATEGORY_WEB_DEVELOPMENT}
          </div>
        </a>
        <a href={`/category/${slugify(CATEGORY_BASICS)}`}>
          <div
            className={
              activeMenu === CATEGORY_BASICS
                ? classnames(style.menu, style.menuActive, style.basics)
                : classnames(style.menu, style.menuInactive, style.basics)
            }
          >
            {CATEGORY_BASICS}
          </div>
        </a>
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
