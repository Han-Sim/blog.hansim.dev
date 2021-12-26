import React, { useContext } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import LabelIcon from "@material-ui/icons/Label";
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
            <CloseIcon />
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
          <MenuDrawerTags postCountByTag={postCountByTag} />
        </List>
      </div>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  postCountByTag: PropTypes.shape({}),
};

export default MenuDrawer;
