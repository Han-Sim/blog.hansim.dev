import React, { useContext, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
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
import {
  convertArrayToObjectOfCountOccurrences,
  sortObjectByValueInDescOrder,
} from "src/util/helpers";
import Tag from "../../tag";
import style from "./menuDrawer.module.scss";

const MenuDrawer = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(Context);

  // TODO: move all of this logic to drawer.
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const { edges = [] } = data.allMarkdownRemark;

  // Post count by tag and sort it by descending order.
  const postCountByTag = useMemo(() => {
    const tagsAll = [];

    edges.forEach(edge => {
      tagsAll.push(...edge.node.frontmatter.tags);
    });

    return sortObjectByValueInDescOrder(
      convertArrayToObjectOfCountOccurrences(tagsAll)
    );
  }, [edges]);

  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [index, [tag, count]] of Object.entries(
      postCountByTag
    ).entries()) {
      arr.push(
        <Tag
          tag={tag}
          key={tag}
          count={count}
          isLastTag={index === Object.entries(postCountByTag).length - 1}
        />
      );
    }

    return arr;
  }, [postCountByTag]);

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
          <div className={style.tagsContainer}>{tagsToRender}</div>
        </List>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
