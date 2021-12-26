import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import each from "lodash/each";
import get from "lodash/get";

import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import Post from "src/components/post";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            id
            html
            frontmatter {
              title
              date(formatString: "MMM D, YYYY")
              author
              tags
              category
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const latestPost = data.allMarkdownRemark.edges[0].node;

  const titlesOfAll = [];
  each(data.allMarkdownRemark.edges, edge => {
    if (get(edge, "node.frontmatter.title")) {
      titlesOfAll.push(edge.node.frontmatter.title);
    }
  });

  return (
    <Layout>
      <SEO title={latestPost.frontmatter.title} />
      <Post
        author={latestPost.frontmatter.author}
        category={latestPost.frontmatter.category}
        date={latestPost.frontmatter.date}
        tags={latestPost.frontmatter.tags}
        title={latestPost.frontmatter.title}
        titlesOfAll={titlesOfAll}
      >
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: latestPost.html }}
        />
      </Post>
    </Layout>
  );
};

export default IndexPage;
