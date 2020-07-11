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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Context } from "../../../context";
import { slugify } from "../../../util/helperFunctions";
import {
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
} from "../../../util/constants";
import MenuTags from "./Menu.Tags";

import style from "./menu.list.module.scss";

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
  postCountByTagDescOrder,
}) => {
  const { setActiveMenu } = useContext(Context);
  const handleCategoryOnClick = useCallback(
    category => {
      setActiveMenu(category);
      navigate(`/all-posts`);
    },
    [setActiveMenu]
  );

  // TODO:
  // Don't create a new page, but just use global context.
  // Create a tab to see each post on given list of post always.
  // If user clicks a tag under CATEGORY_BASICS, then CATEGORY_BASICS will be the default tab.
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
          <ListItem
            button
            key={CATEGORY_WEB_DEVELOPMENT}
            onClick={handleCategoryOnClick(CATEGORY_WEB_DEVELOPMENT)}
          >
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
          <Divider />
          <div className={style.categoryContainer}>
            <MenuTags
              tags={categoryWithTags[CATEGORY_WEB_DEVELOPMENT]}
              postCountByTagDescOrder={postCountByTagDescOrder}
            />
          </div>
        </List>
        <Divider />
        <List disablePadding>
          <ListItem
            button
            key={CATEGORY_BASICS}
            onClick={handleCategoryOnClick(CATEGORY_BASICS)}
          >
            <ListItemIcon
              classes={{
                root: style.menuIcon,
              }}
            >
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText>{CATEGORY_BASICS}</ListItemText>
          </ListItem>
          <Divider />
          <div className={style.categoryContainer}>
            <MenuTags
              tags={categoryWithTags[CATEGORY_BASICS]}
              postCountByTagDescOrder={postCountByTagDescOrder}
            />
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
  postCountByCategory: PropTypes.shape({}),
  postCountByTagDescOrder: PropTypes.shape({}),
  recentTitles: PropTypes.arrayOf(PropTypes.string),
  toggleMenu: PropTypes.func,
};

export default MenuList;
