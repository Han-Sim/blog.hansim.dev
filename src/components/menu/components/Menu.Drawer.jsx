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
import MenuDrawerTags from "./Menu.Drawer.Tags";
import style from "./menu.drawer.module.scss";

const MenuDrawer = ({ postCountByTag }) => {
  const { isMenuOpen, setIsMenuOpen } = useContext(Context);

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      onBackdropClick={() => {
        setIsMenuOpen(false);
      }}
      onEscapeKeyDown={() => {
        setIsMenuOpen(false);
      }}
    >
      <div className={style.drawerContainer}>
        <div
          className={style.drawerHeader}
          onClick={() => {
            setIsMenuOpen(false);
          }}
          role="button"
          tabIndex={0}
        >
          <IconButton>
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
            <MenuDrawerTags postCountByTag={postCountByTag} />
          </div>
        </List>
      </div>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  postCountByTag: PropTypes.shape({}),
};

export default MenuDrawer;
