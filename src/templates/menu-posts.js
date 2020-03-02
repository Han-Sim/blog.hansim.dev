import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostList from "../components/post-list";
import SEO from "../components/seo";
import { slugify } from "../util/helperFunctions";

// TODO: this is same UI with CategoryPosts. Should be refactored.
const MenuPosts = ({ data, pageContext }) => {
  const { menu, totalCount } = pageContext;

  const pageTitle = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } found in `;

  const seoTitle = `Posts in ${menu}`;
  return (
    <Layout>
      <SEO title={seoTitle} />
      <div className="post-header-area">
        <div className="post-header">
          <div className="post-title">
            <h1>
              {pageTitle}
              <br />
              <strong>{menu}</strong>
            </h1>
          </div>
        </div>
      </div>
      <div className="container py-5 post-list">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostList
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={slugify(node.frontmatter.title)}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
          />
        ))}
      </div>
    </Layout>
  );
};

export const MenuQuery = graphql`
  query($menu: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { menu: { in: [$menu] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            category
            menu
            tags
          }
          excerpt
        }
      }
    }
  }
`;

export default MenuPosts;
