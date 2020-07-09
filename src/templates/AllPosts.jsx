import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/seo";
import style from "./allPost.module.scss";

const AllPosts = ({ data }) => {
  const { totalCount } = data.allMarkdownRemark;

  const pageTitle = `${totalCount} post${totalCount === 1 ? "" : "s"} in total`;
  const seoTitle = `All Posts`;

  return (
    <Layout>
      <SEO title={seoTitle} />
      <div className={style.root}>
        {/* <div className="post-header-area">
          <div className="post-header">
            <div className="post-title">
              <h1>
                {pageTitle}
                <br />
              </h1>
            </div>
          </div>
        </div> */}
        <div>
          {data.allMarkdownRemark.edges.map(({ node }, index) => (
            <PostCard
              key={node.id}
              title={node.frontmatter.title}
              author={node.frontmatter.author}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              body={node.excerpt}
              tags={node.frontmatter.tags}
              index={index}
            />
          ))}
        </div>
      </div>
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
          excerpt
        }
      }
    }
  }
`;

export default AllPosts;
