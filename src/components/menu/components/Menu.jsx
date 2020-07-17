import React, { forwardRef, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import uniq from "lodash/uniq";
import {
  countOccurrences,
  sortObjectByValueDescOrder,
} from "src/util/helperFunctions";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import MenuBar from "./Menu.Bar";
import MenuList from "./Menu.List";

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
  const edges = useMemo(() => data.allMarkdownRemark.edges, [
    data.allMarkdownRemark.edges,
  ]);

  const categoryTags = useMemo(() => {
    const obj = {
      categories: [],
      categoryWithTags: {
        [CATEGORY_WEB_DEVELOPMENT]: [],
        [CATEGORY_BASICS]: [],
      },
      categoryWithTagsUniq: {
        [CATEGORY_WEB_DEVELOPMENT]: [],
        [CATEGORY_BASICS]: [],
      },
    };

    edges.forEach(edge => {
      obj.categories.push(edge.node.frontmatter.category);
      obj.categoryWithTags[edge.node.frontmatter.category] = [
        ...obj.categoryWithTags[edge.node.frontmatter.category],
        ...edge.node.frontmatter.tags,
      ];
    });

    // uniq for categoryWithTags
    obj.categoryWithTagsUniq[CATEGORY_WEB_DEVELOPMENT] = uniq(
      obj.categoryWithTags[CATEGORY_WEB_DEVELOPMENT]
    );
    obj.categoryWithTagsUniq[CATEGORY_BASICS] = uniq(
      obj.categoryWithTags[CATEGORY_BASICS]
    );

    return obj;
  }, [edges]);

  // Post count by tag and category.
  // Sort it by desc order.
  const postCountByTagAndCategory = useMemo(() => {
    const postCountByTagAndCategory = {
      [CATEGORY_WEB_DEVELOPMENT]: sortObjectByValueDescOrder(
        countOccurrences(
          categoryTags.categoryWithTags[CATEGORY_WEB_DEVELOPMENT]
        )
      ),
      [CATEGORY_BASICS]: sortObjectByValueDescOrder(
        countOccurrences(categoryTags.categoryWithTags[CATEGORY_BASICS])
      ),
    };

    return postCountByTagAndCategory;
  }, [categoryTags.categoryWithTags]);

  // Category count.
  const postCountByCategory = useMemo(
    () => countOccurrences(categoryTags.categories),
    [categoryTags.categories]
  );

  return (
    <>
      <MenuBar onClick={toggleMenu} ref={ref} />
      <MenuList
        postCountByCategory={postCountByCategory}
        postCountByTagAndCategory={postCountByTagAndCategory}
        toggleMenu={toggleMenu}
        categoryWithTags={categoryTags.categoryWithTags}
      />
    </>
  );
});

export default Menu;
