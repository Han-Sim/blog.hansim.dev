import React, { useMemo } from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import PostList from "src/components/postList";

const AllPosts = ({ data }) => {
  const seoTitle = useMemo(() => "All Posts", []);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <PostList data={data} />
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
            date(formatString: "MMM Do YYYY")
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

export default AllPosts;
