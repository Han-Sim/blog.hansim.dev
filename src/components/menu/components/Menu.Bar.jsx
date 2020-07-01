import React, { forwardRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

import style from "./menu.module.scss";

const MenuBar = forwardRef((props, ref) => (
  <div className={style.container} ref={ref}>
    <div>
      <IconButton href="/" title="Latest Post">
        <HomeIcon
          classes={{
            root: style.homeIcon,
          }}
        />
      </IconButton>
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
