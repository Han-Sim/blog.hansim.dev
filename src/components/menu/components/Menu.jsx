import React, { forwardRef, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { countOccurrences, sortObjectByValueDescOrder } from "src/util/helpers";
// import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import MenuBar from "./Menu.Bar";
import MenuList from "./Menu.List";

// const categories = [CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS];

const Menu = forwardRef(({ toggleMenu }, ref) => {
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
    return sortObjectByValueDescOrder(countOccurrences(tagsAll));
  }, [tagsAll]);

  // Category count. TODO: put it later.
  // const postCountByCategory = useMemo(() => countOccurrences(categories), [
  //   categories,
  // ]);

  return (
    <>
      <MenuBar onClick={toggleMenu} ref={ref} />
      <MenuList
        // postCountByCategory={postCountByCategory}
        postCountByTag={postCountByTag}
        toggleMenu={toggleMenu}
      />
    </>
  );
});

export default Menu;
