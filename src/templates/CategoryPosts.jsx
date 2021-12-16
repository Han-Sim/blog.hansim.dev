import React, { useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import {
  CATEGORY_ALL_POSTS,
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
  PATH_ALL_POSTS,
  PATH_CATEGORY_BASICS,
  PATH_CATEGORY_WEB_DEVELOPMENT,
} from "src/util/constants";
import { Context } from "src/context";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";

const CategoryPosts = ({ data, pageContext, path }) => {
  const { category } = pageContext;
  const { setActiveMenu } = useContext(Context);

  useEffect(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        setActiveMenu(CATEGORY_ALL_POSTS);
        break;

      case PATH_CATEGORY_BASICS: {
        setActiveMenu(CATEGORY_BASICS);
        break;
      }
      case PATH_CATEGORY_WEB_DEVELOPMENT: {
        setActiveMenu(CATEGORY_WEB_DEVELOPMENT);
        break;
      }
    }
  }, [path, setActiveMenu]);

  const seoTitle = useMemo(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        return "All posts";
      case PATH_CATEGORY_BASICS:
        return "Programming basics";
      case PATH_CATEGORY_WEB_DEVELOPMENT:
        return "Web development";
    }
  }, [path]);

  const posts = useMemo(() => {
    const nodes = data.allMarkdownRemark.edges.map(({ node }) => node);

    return category === CATEGORY_ALL_POSTS
      ? nodes
      : nodes.filter(node => node.frontmatter.category === category);
  }, [category, data]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts posts={posts} />
    </Layout>
  );
};

export const CategoryPostsQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do, YYYY")
            author
            category
            tags
          }
          fields {
            slug
          }
          excerpt(format: HTML)
        }
      }
    }
  }
`;

CategoryPosts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              author: PropTypes.string.isRequired,
              category: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string),
              title: PropTypes.string.isRequired,
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string,
            }).isRequired,
          }).isRequired,
        })
      ),
    }),
  }),
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  path: PropTypes.string,
};

export default CategoryPosts;
