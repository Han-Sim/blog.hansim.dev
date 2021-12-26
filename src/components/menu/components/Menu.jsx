import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Context } from "src/context";
import style from "./menu.module.scss";

// TODO: hide it when scroll down if the screen height is small.
const Menu = () => {
  const { setIsMenuOpen } = useContext(Context);

  return (
    <div className={style.menuContainer}>
      <div className={style.logo}>
        <a href="/posts">Han Sim.</a>
      </div>
      <IconButton
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Menu;
