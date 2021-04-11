import React, { forwardRef, useContext } from "react";
import { navigate } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classnames from "classnames";
import { Context } from "src/context";
import {
  CATEGORY_ALL_POSTS,
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
  KEY_ENTER,
  PATH_ALL_POSTS,
  PATH_CATEGORY_BASICS,
  PATH_CATEGORY_WEB_DEVELOPMENT,
} from "src/util/constants";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((props, ref) => {
  const { activeMenu } = useContext(Context);

  const navigateCategory = path => {
    navigate(path);
  };

  const handleCategoryOnClick = category => navigateCategory(category);

  const handleCategoryOnKeyDown = (category, event) => {
    if (event.keyCode === KEY_ENTER) {
      navigateCategory(category);
    }
  };

  return (
    <div className={style.container} ref={ref}>
      <div className={style.left}>
        <div
          className={
            activeMenu === CATEGORY_ALL_POSTS
              ? classnames(style.menu, style.menuActive, style.allPosts)
              : classnames(style.menu, style.menuInactive, style.allPosts)
          }
          onClick={() => handleCategoryOnClick(PATH_ALL_POSTS)}
          onKeyDown={event =>
            handleCategoryOnKeyDown(CATEGORY_ALL_POSTS, event)
          }
          role="button"
          tabindex={0}
        >
          {CATEGORY_ALL_POSTS}
        </div>
        <div
          className={
            activeMenu === CATEGORY_WEB_DEVELOPMENT
              ? classnames(style.menu, style.menuActive, style.web)
              : classnames(style.menu, style.menuInactive, style.web)
          }
          onClick={() => handleCategoryOnClick(PATH_CATEGORY_WEB_DEVELOPMENT)}
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
          onClick={() => handleCategoryOnClick(PATH_CATEGORY_BASICS)}
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
