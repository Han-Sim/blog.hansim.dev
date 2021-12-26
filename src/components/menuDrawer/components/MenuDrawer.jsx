import React, { useContext, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Drawer from "@material-ui/core/Drawer";
import { Context } from "src/context";
import {
  convertArrayToObjectOfCountOccurrences,
  sortObjectByValueInDescOrder,
} from "src/util/helpers";
import Tag from "../../tag";
import style from "./menuDrawer.module.scss";

const MenuDrawer = () => {
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } = useContext(Context);

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
        <div style={{ marginBottom: "5px" }}>
          <Tag
            tag={tag}
            key={tag}
            count={count}
            isLastTag={index === Object.entries(postCountByTag).length - 1}
            onClick={() => {
              setIsMenuDrawerOpen(false);
            }}
          />
        </div>
      );
    }

    return arr;
  }, [postCountByTag]);

  return (
    <Drawer
      open={isMenuDrawerOpen}
      anchor="right"
      onBackdropClick={() => {
        setIsMenuDrawerOpen(false);
      }}
      onEscapeKeyDown={() => {
        setIsMenuDrawerOpen(false);
      }}
    >
      <div className={style.drawerContainer}>
        <div className={style.list}>
          <div className={style.listHeader}>Tags</div>
          <div className={style.tagsContainer}>{tagsToRender}</div>
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
