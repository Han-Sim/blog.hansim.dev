import React, { forwardRef, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  convertArrayToObjectOfCountOccurrences,
  sortObjectByValueInDescOrder,
} from "src/util/helpers";
import MenuBar from "./Menu.Bar";
import MenuDrawer from "./Menu.Drawer";

// const categories = [CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS];

const Menu = forwardRef((_props, ref) => {
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

  const tagsAll = useMemo(() => {
    const tagsAll = [];

    edges.forEach(edge => {
      tagsAll.push(...edge.node.frontmatter.tags);
    });

    return tagsAll;
  }, [edges]);

  // Post count by tag and sort it by descending order.
  const postCountByTag = useMemo(() => {
    return sortObjectByValueInDescOrder(
      convertArrayToObjectOfCountOccurrences(tagsAll)
    );
  }, [tagsAll]);

  // Category count. TODO: put it later.
  // const postCountByCategory = useMemo(() => convertArrayToObjectOfCountOccurrences(categories), [
  //   categories,
  // ]);

  return (
    <>
      <MenuBar ref={ref} />
      <MenuDrawer
        // postCountByCategory={postCountByCategory}
        postCountByTag={postCountByTag}
      />
    </>
  );
});

export default Menu;
