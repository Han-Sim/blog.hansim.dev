import React, { useContext, useMemo, useEffect, useState } from "react";
import { Context } from "src/context";
import { graphql } from "gatsby";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";
import SEO from "src/components/seo";

const TagPosts = ({ data, pageContext }) => {
  const { activeMenu, setActiveMenu } = useContext(Context);
  const { tag } = pageContext;
  const [totalCount, setTotalCount] = useState();

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);

  // Check if there are some posts found here in this tap (web development).
  // If there is none, set it to the another category.
  // This entry happens when user enters this tag posts page directly, since web development is default.
  useEffect(() => {
    if (totalCount === 0 && activeMenu === CATEGORY_WEB_DEVELOPMENT) {
      setActiveMenu(CATEGORY_BASICS);
    }
  }, [totalCount, activeMenu, setActiveMenu]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts data={data} tag={tag} setTotalCount={setTotalCount} />
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
