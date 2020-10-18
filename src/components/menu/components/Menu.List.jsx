import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ComputerIcon from "@material-ui/icons/Computer";
import LanguageIcon from "@material-ui/icons/Language";
import { Context } from "src/context";
import {
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
  KEY_ENTER,
} from "src/util/constants";
import MenuTags from "./Menu.Tags";
import style from "./menu.list.module.scss";

const MenuList = ({
  categoryWithTags,
  toggleMenu,
  postCountByCategory,
  postCountByTagAndCategory,
}) => {
  const { setActiveMenu, isMenuOpen, setIsMenuOpen } = useContext(Context);

  const handleCategoryOnClick = useCallback(
    category => {
      setActiveMenu(category);
      setIsMenuOpen(false);
      navigate(`/posts`);
    },
    [setActiveMenu, setIsMenuOpen]
  );

  const handleCategoryOnKeyDown = useCallback(
    (category, event) => {
      if (event.keyCode === KEY_ENTER) {
        setActiveMenu(category);
        setIsMenuOpen(false);
        navigate(`/posts`);
      }
    },
    [setActiveMenu, setIsMenuOpen]
  );

  const handleTagOnClick = useCallback(
    category => {
      setActiveMenu(category);
      setIsMenuOpen(false);
    },
    [setActiveMenu, setIsMenuOpen]
  );

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
          <div
            onClick={() => handleCategoryOnClick(CATEGORY_WEB_DEVELOPMENT)}
            onKeyDown={event =>
              handleCategoryOnKeyDown(CATEGORY_WEB_DEVELOPMENT, event)
            }
            role="button"
            tabindex={0}
          >
            <ListItem button key={CATEGORY_WEB_DEVELOPMENT}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText>
                {`${CATEGORY_WEB_DEVELOPMENT} (${postCountByCategory[CATEGORY_WEB_DEVELOPMENT]})`}
              </ListItemText>
            </ListItem>
          </div>
          <Divider />
          <div className={style.categoryContainer}>
            <MenuTags
              tags={categoryWithTags[CATEGORY_WEB_DEVELOPMENT]}
              postCountByTagDescOrder={
                postCountByTagAndCategory[[CATEGORY_WEB_DEVELOPMENT]]
              }
              onClick={() => handleTagOnClick(CATEGORY_WEB_DEVELOPMENT)}
            />
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <div
            onClick={() => handleCategoryOnClick(CATEGORY_BASICS)}
            onKeyDown={event => handleCategoryOnKeyDown(CATEGORY_BASICS, event)}
            role="button"
            tabindex={0}
          >
            <ListItem button key={CATEGORY_BASICS}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText>
                {`${CATEGORY_BASICS} (${postCountByCategory[CATEGORY_BASICS]})`}
              </ListItemText>
            </ListItem>
          </div>
          <Divider />
          <div className={style.categoryContainer}>
            <MenuTags
              tags={categoryWithTags[CATEGORY_BASICS]}
              postCountByTagDescOrder={
                postCountByTagAndCategory[CATEGORY_BASICS]
              }
              onClick={() => handleTagOnClick(CATEGORY_BASICS)}
            />
          </div>
        </List>
      </div>
    </Drawer>
  );
};

MenuList.propTypes = {
  categoryWithTags: PropTypes.shape({
    [CATEGORY_WEB_DEVELOPMENT]: PropTypes.array,
    [CATEGORY_BASICS]: PropTypes.array,
  }),
  postCountByCategory: PropTypes.shape({}),
  postCountByTagAndCategory: PropTypes.shape({
    [CATEGORY_WEB_DEVELOPMENT]: PropTypes.shape({}),
    [CATEGORY_BASICS]: PropTypes.shape({}),
  }),
  toggleMenu: PropTypes.func,
};

export default MenuList;
