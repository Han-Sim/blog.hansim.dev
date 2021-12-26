import React, { useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MENU_ALL_POSTS, PATH_ALL_POSTS } from "src/util/constants";
import { Context } from "src/context";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";

const AllPosts = ({ data, pageContext, path }) => {
  const { category } = pageContext;
  const { setActiveMenu } = useContext(Context);

  useEffect(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        setActiveMenu(MENU_ALL_POSTS);
        break;
    }
  }, [path, setActiveMenu]);

  const seoTitle = useMemo(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        return "All posts";
      default:
        return "";
    }
  }, [path]);

  const posts = useMemo(() => {
    const nodes = data.allMarkdownRemark.edges.map(({ node }) => node);

    return category === MENU_ALL_POSTS
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

export const AllPostsQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
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

AllPosts.propTypes = {
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

export default AllPosts;
