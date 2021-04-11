import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { navigate } from "gatsby";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LabelIcon from "@material-ui/icons/Label";
// import ComputerIcon from "@material-ui/icons/Computer";
// import LanguageIcon from "@material-ui/icons/Language";
import { Context } from "src/context";
import MenuTags from "./Menu.Tags";
import style from "./menu.list.module.scss";

const MenuList = ({ postCountByTag, toggleMenu }) => {
  const { isMenuOpen } = useContext(Context);

  return (
    <Drawer open={isMenuOpen} anchor="right" variant="persistent">
      <div className={style.drawerContainer}>
        <div className={style.drawerHeader}>
          <IconButton onClick={toggleMenu(false)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List disablePadding>
          <ListItem key="tags">
            <ListItemIcon
              classes={{
                root: style.menuIcon,
              }}
            >
              <LabelIcon />
            </ListItemIcon>
            <ListItemText>Tags</ListItemText>
          </ListItem>
          <Divider />
          <div className={style.categoryContainer}>
            <MenuTags postCountByTag={postCountByTag} />
          </div>
        </List>
      </div>
    </Drawer>
  );
};

MenuList.propTypes = {
  postCountByTag: PropTypes.shape({}),
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuList;
