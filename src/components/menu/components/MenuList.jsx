import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

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
  MENU_BASICS,
  MENU_HIERARCHY,
  MENU_WEB_DEVELOPMENT,
} from "../../../util/constants";

import style from "./menu.module.scss";

const CustomListItem = ({ title, link }) => (
  <Link to={link}>
    <ListItem
      button
      key={title}
      classes={{
        root: style.listItem,
      }}
    >
      <ListItemText>{title}</ListItemText>
    </ListItem>
  </Link>
);

CustomListItem.propTypes = {
  title: PropTypes.string,
};

const MenuList = ({ open, toggleMenu, recentTitles }) => {
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
          <Link to={`/menu/${slugify(MENU_WEB_DEVELOPMENT)}`}>
            <ListItem button key={MENU_WEB_DEVELOPMENT}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText>{MENU_WEB_DEVELOPMENT}</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <div className={style.categoryContainer}>
            {MENU_HIERARCHY[MENU_WEB_DEVELOPMENT].map(category => (
              <CustomListItem
                title={category}
                link={`/category/${slugify(category)}`}
              />
            ))}
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <Link to={`/menu/${slugify(MENU_BASICS)}`}>
            <ListItem button key={MENU_BASICS}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText>{MENU_BASICS}</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <div className={style.categoryContainer}>
            {MENU_HIERARCHY[MENU_BASICS].map(category => (
              <CustomListItem
                title={category}
                link={`/category/${slugify(category)}`}
              />
            ))}
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <Link to="/all-posts">
            <ListItem button key={MENU_BASICS}>
              <ListItemIcon
                classes={{
                  root: style.menuIcon,
                }}
              >
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText>Recent Posts</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <div className={style.categoryContainer}>
            {recentTitles.map(title => (
              <CustomListItem title={title} link={slugify(title)} />
            ))}
          </div>
        </List>
      </div>
    </Drawer>
  );
};

MenuList.propTypes = {
  open: PropTypes.bool,
  toggleMenu: PropTypes.func,
  recentTitles: PropTypes.arrayOf(PropTypes.string),
};

export default MenuList;

// TODO: tags. (or maybe need a dedicated page for tags.)
// <span className="menu-title m-4">Tags</span>
// {tags.map(tag => (
//   <a
//     key={tag}
//     className="menu-item tag-item mr-4"
//     href={`/tag/${slugify(tag)}`}
//   >
//     {tag}
//     <Badge color="light" className="ml-1">
//       {tagPostCount[tag]}
//     </Badge>
//   </a>
// ))}
