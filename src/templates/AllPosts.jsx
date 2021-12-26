import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { PATH_ALL_POSTS } from "src/util/constants";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";

const AllPosts = ({ data, path }) => {
  const seoTitle = useMemo(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        return "Posts";
      default:
        return "";
    }
  }, [path]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts posts={data.allMarkdownRemark.edges.map(({ node }) => node)} />
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
