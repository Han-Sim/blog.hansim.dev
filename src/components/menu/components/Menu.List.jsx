import React from "react";
import PropTypes from "prop-types";

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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import { slugify } from "../../../util/helperFunctions";
import {
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
} from "../../../util/constants";

import style from "./menu.module.scss";

const CustomListItem = ({ index, title, link }) => (
  <a href={link} className={style.link}>
    <ListItem
      button
      key={`ListItem-${index}-${title}`}
      classes={{
        root: style.listItem,
      }}
    >
      <ListItemText>{title}</ListItemText>
    </ListItem>
  </a>
);

CustomListItem.propTypes = {
  title: PropTypes.string,
};

const MenuList = ({
  categoryWithTags,
  open,
  toggleMenu,
  recentTitles,
  postCountByCategory,
  postCountByTag,
}) => {
  // TODO:
  // 3. Font size, etc.
  // 4. href link (slugify), post count, etc.
  // 5. Recent Post should be different ... it looks like a category.
  return (
    <Drawer open={open} anchor="right" variant="persistent">
      <div className={style.drawerContainer}>
        <div className={style.drawerHeader}>
          <IconButton onClick={toggleMenu(false)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List disablePadding>
          <a
            href={`/category/${slugify(CATEGORY_WEB_DEVELOPMENT)}`}
            className={style.link}
          >
            <ListItem button key={CATEGORY_WEB_DEVELOPMENT}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText>{CATEGORY_WEB_DEVELOPMENT}</ListItemText>
            </ListItem>
          </a>
          <Divider />
          <div className={style.categoryContainer}>
            {/* {MENU_HIERARCHY[MENU_WEB_DEVELOPMENT].map((category, index) => (
              <CustomListItem
                title={category}
                link={`/category/${slugify(category)}`}
                key={index}
              />
            ))} */}
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <a
            href={`/category/${slugify(CATEGORY_BASICS)}`}
            className={style.link}
          >
            <ListItem button key={CATEGORY_BASICS}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText>{CATEGORY_BASICS}</ListItemText>
            </ListItem>
          </a>
          <Divider />
          <div className={style.categoryContainer}>
            {/* {MENU_HIERARCHY[MENU_BASICS].map((category, index) => (
              <CustomListItem
                title={category}
                link={`/category/${slugify(category)}`}
                key={index}
              />
            ))} */}
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <a href="/all-posts" className={style.link}>
            <ListItem button key="Recent Posts">
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText>Recent Posts</ListItemText>
            </ListItem>
          </a>
          <Divider />
          <div className={style.categoryContainer}>
            {recentTitles.map((title, index) => (
              <CustomListItem
                title={title}
                link={`/${slugify(title)}`}
                key={index}
              />
            ))}
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
  open: PropTypes.bool,
  toggleMenu: PropTypes.func,
  recentTitles: PropTypes.arrayOf(PropTypes.string),
};

export default MenuList;
