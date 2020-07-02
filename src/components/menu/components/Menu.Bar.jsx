import React, { forwardRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Divider from "@material-ui/core/Divider";
import { MENU_WEB_DEVELOPMENT, MENU_BASICS } from "../../../util/constants";
import { slugify } from "../../../util/helperFunctions";
import style from "./menu.module.scss";

const MenuBar = forwardRef((props, ref) => (
  <div className={style.container} ref={ref}>
    <div className={style.left}>
      <IconButton href="/" title="Latest Post">
        <HomeIcon
          classes={{
            root: style.homeIcon,
          }}
        />
      </IconButton>
      <a href={`/category/${slugify(MENU_WEB_DEVELOPMENT)}`}>
        <div className={style.menus}>{MENU_WEB_DEVELOPMENT}</div>
      </a>
      <div className={style.menus}>
        <Divider
          orientation="vertical"
          classes={{
            vertical: style.verticalDivider,
          }}
        />
      </div>
      <a href={`/category/${slugify(MENU_BASICS)}`}>
        <div className={style.menus}>{MENU_BASICS}</div>
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
));

export default MenuBar;
