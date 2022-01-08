import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PATH_ALL_POSTS } from "src/util/constants";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";

const AllPosts = ({ path }) => {
  const data = useStaticQuery(graphql`
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
  `);

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

export default AllPosts;
