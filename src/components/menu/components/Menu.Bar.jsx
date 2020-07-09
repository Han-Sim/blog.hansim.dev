import React, { forwardRef, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Context } from "../../../context";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Divider from "@material-ui/core/Divider";
import classnames from "classnames";
import {
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
} from "../../../util/constants";
import { slugify } from "../../../util/helperFunctions";
import style from "./menu.bar.module.scss";

const MenuBar = forwardRef((props, ref) => {
  const { activeMenu } = useContext(Context);

  return (
    <div className={style.container} ref={ref}>
      <div className={style.left}>
        <IconButton href="/" title="Latest Post">
          <HomeIcon
            classes={{
              root: style.homeIcon,
            }}
          />
        </IconButton>
        <a href={`/category/${slugify(CATEGORY_WEB_DEVELOPMENT)}`}>
          <div className={classnames(style.menu, style.menuInactive)}>
            {CATEGORY_WEB_DEVELOPMENT}
          </div>
        </a>
        <div className={classnames(style.menu)}>
          <Divider
            orientation="vertical"
            classes={{
              vertical: style.verticalDivider,
            }}
          />
        </div>
        <a href={`/category/${slugify(CATEGORY_BASICS)}`}>
          <div className={classnames(style.menu, style.menuInactive)}>
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
