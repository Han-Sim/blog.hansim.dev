import React from "react";

import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import style from "./menu.module.scss";

const Menu = ({ onClick }) => (
  <div className={style.container}>
    <div>
      <IconButton href="/" title="Latest Post">
        <HomeIcon />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={onClick(true)}>
        <MenuOpenIcon />
      </IconButton>
    </div>
  </div>
);

export default Menu;
