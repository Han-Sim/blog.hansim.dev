import React from "react";
import PropTypes from "prop-types";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Badge } from "reactstrap";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ComputerIcon from "@material-ui/icons/Computer";
import LanguageIcon from "@material-ui/icons/Language";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import {
  MENU_BASICS,
  MENU_HIERARCHY,
  MENU_WEB_DEVELOPMENT,
} from "../../../util/constants";

import style from "./menu.module.scss";

const ListItemForSubMenu = ({ subMenu }) => (
  <ListItem
    button
    key={subMenu}
    classes={{
      root: style.listItem,
    }}
  >
    <ListItemText>{subMenu}</ListItemText>
  </ListItem>
);

ListItemForSubMenu.propTypes = {
  subMenu: PropTypes.string,
};

const MenuList = ({ open, toggleMenu, recentTitles, ...others }) => {
  console.log(others);
  console.log(MENU_HIERARCHY);

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
          <Divider />
          <div className={style.subMenuContainer}>
            {MENU_HIERARCHY[MENU_WEB_DEVELOPMENT].map(subMenu => (
              <ListItemForSubMenu subMenu={subMenu} />
            ))}
          </div>
        </List>
        <Divider />
        <List disablePadding>
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
          <Divider />
          <div className={style.subMenuContainer}>
            {MENU_HIERARCHY[MENU_BASICS].map(subMenu => (
              <ListItemForSubMenu subMenu={subMenu} />
            ))}
          </div>
        </List>
        <Divider />
        <List disablePadding>
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
          <Divider />
          <div className={style.subMenuContainer}>
            {recentTitles.map(title => (
              <ListItemForSubMenu subMenu={title} />
            ))}
          </div>
        </List>
      </div>
    </Drawer>
  );
};

export default MenuList;

// <a href="/markdown-blog-with-gatsbygraphql">
//   <h3>
//     <strong className="up-link">About this blog</strong>
//   </h3>
// </a>
// {/* <a href="https://hansim.dev" target="_blank" rel="noopener noreferrer">
//   <h3>
//     <strong className="up-link">About me</strong>
//   </h3>
// </a> */}
// <div className="menu-between" />
// <span className="menu-title m-4">Categories</span>
// <a href={`/all-posts`} className="menu-item">
//   All Posts{" "}
//   <Badge color="light" className="ml-1">
//     {data.allMarkdownRemark.totalCount}
//   </Badge>
// </a>
// {categories.map(category => (
//   <a
//     key={category}
//     className="menu-item"
//     href={`/category/${slugify(category)}`}
//   >
//     {category}{" "}
//     <Badge color="light" className="ml-1">
//       {categoryCount[category]}
//     </Badge>
//   </a>
// ))}
// <div className="menu-between" />
// <span className="menu-title m-4">Recent Posts</span>
// {titles.map(title => (
//   <a key={title} className="menu-item" href={`/${slugify(title)}`}>
//     {title}
//   </a>
// ))}
// <div className="menu-between" />
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
