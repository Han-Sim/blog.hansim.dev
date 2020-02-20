import React, { useMemo, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import uniq from "lodash/uniq";

import { countEach } from "../../../util/helperFunctions";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";

const NUM_OF_RECENT_POSTS = 6;

const MenuContainer = () => {
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
  const edges = useMemo(() => data.allMarkdownRemark.edges, [
    data.allMarkdownRemark.edges,
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array of tags.
  const tags = useMemo(() => {
    let result = [];
    edges.forEach(edge => {
      edge.node.frontmatter.tags.forEach(tag => result.push(tag));
    });

    return result;
  }, [edges]);

  // Post count. i.e. { JavaScript: 5, Java: 12, ...}
  const postCountByTag = useMemo(() => countEach(tags), [countEach, tags]);

  // List of unique tags.
  const tagList = useMemo(() => uniq(tags), [tags]);

  // Array of categories.
  const categories = useMemo(
    () => edges.map(edge => edge.node.frontmatter.category),
    [edges]
  );

  // Category count.
  const postCountByCategory = useMemo(() => countEach(categories), [
    countEach,
    tags,
  ]);

  // Get recent titles.
  const recentTitles = useMemo(() => {
    const titles = edges.map(edge => edge.node.frontmatter.title);
    return titles.slice(0, NUM_OF_RECENT_POSTS);
  });

  /**
   * On click handler for Menu button.
   */
  const toggleMenu = (value) => event => {
    setIsMenuOpen(value);
  };

  return (
    <>
      <MenuBar onClick={toggleMenu} />
      <MenuList
        open={isMenuOpen}
        postCountByCategory={postCountByCategory}
        postCountByTag={postCountByTag} 
        recentTitles={recentTitles}
        tagList={tagList}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default MenuContainer;
