import React from "react";

import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";

import style from "./menu.module.scss";

const Menu = () => (
  <div className={style.container}>
    <div>
      <IconButton href="/" title="Latest Post">
        <HomeIcon />
      </IconButton>
    </div>
    <div>
      <IconButton>
        <MenuIcon />
      </IconButton>
    </div>
  </div>
);

export default Menu;
