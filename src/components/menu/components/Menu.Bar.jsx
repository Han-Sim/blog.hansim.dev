import React, { forwardRef, useContext, useCallback } from "react";
import { navigate } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classnames from "classnames";
import { Context } from "src/context";
import {
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
  KEY_ENTER,
} from "src/util/constants";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((props, ref) => {
  const { activeMenu, setActiveMenu } = useContext(Context);

  const handleCategoryOnClick = useCallback(
    category => {
      navigate(`/posts`);
      setActiveMenu(category);
    },
    [setActiveMenu]
  );

  const handleCategoryOnKeyDown = useCallback(
    (category, event) => {
      if (event.keyCode === KEY_ENTER) {
        navigate(`/posts`);
        setActiveMenu(category);
      }
    },
    [setActiveMenu]
  );

  return (
    <div className={style.container} ref={ref}>
      <div className={style.left}>
        <div
          className={
            activeMenu === CATEGORY_WEB_DEVELOPMENT
              ? classnames(style.menu, style.menuActive, style.webDevelopment)
              : classnames(style.menu, style.menuInactive, style.webDevelopment)
          }
          onClick={() => handleCategoryOnClick(CATEGORY_WEB_DEVELOPMENT)}
          onKeyDown={event =>
            handleCategoryOnKeyDown(CATEGORY_WEB_DEVELOPMENT, event)
          }
          role="button"
          tabindex={0}
        >
          {CATEGORY_WEB_DEVELOPMENT}
        </div>
        <div
          className={
            activeMenu === CATEGORY_BASICS
              ? classnames(style.menu, style.menuActive, style.basics)
              : classnames(style.menu, style.menuInactive, style.basics)
          }
          onClick={() => handleCategoryOnClick(CATEGORY_BASICS)}
          onKeyDown={event => handleCategoryOnKeyDown(CATEGORY_BASICS, event)}
          role="button"
          tabindex={0}
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
