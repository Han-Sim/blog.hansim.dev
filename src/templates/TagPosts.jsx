import React, { useContext, useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "src/components/Layout";
import PostList from "src/components/PostList";
import SEO from "src/components/seo";

const TagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;

  const pageTitleText = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } related to ${tag} in this category`;

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);
  return (
    <Layout>
      <SEO title={seoTitle} />
      <PostList
        data={data}
        pageTitleText={pageTitleText}
        totalCount={totalCount}
      />
    </Layout>
  );
};

export const TagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            category
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default TagPosts;
