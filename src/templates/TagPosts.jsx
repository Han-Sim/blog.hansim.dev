import React, { useContext, useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";
import SEO from "src/components/seo";

const TagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);
  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts data={data} totalCount={totalCount} tag={tag} />
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
