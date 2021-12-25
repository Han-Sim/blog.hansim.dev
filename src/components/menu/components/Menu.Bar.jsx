import React, { forwardRef, useContext } from "react";
import { navigate } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classnames from "classnames";
import { Context } from "src/context";
import {
  CATEGORY_ALL_POSTS,
  KEY_ENTER,
  PATH_ALL_POSTS,
} from "src/util/constants";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((_props, ref) => {
  const { activeMenu, setIsMenuOpen } = useContext(Context);

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
          tabIndex={0}
        >
          {CATEGORY_ALL_POSTS}
        </div>
        <div className={style.verticalDivider} />
        <div>About</div>
      </div>
      <div>
        <IconButton
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
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
