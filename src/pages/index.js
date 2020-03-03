import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Post from "../components/Post";

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
              date(formatString: "MMM Do YYYY")
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

  let titlesOfAll = [];
  _.each(data.allMarkdownRemark.edges, edge => {
    if (_.get(edge, "node.frontmatter.title")) {
      titlesOfAll = titlesOfAll.concat(edge.node.frontmatter.title);
    }
  });

  let categoriesOfAll = [];
  _.each(data.allMarkdownRemark.edges, edge => {
    if (_.get(edge, "node.frontmatter.category")) {
      categoriesOfAll = categoriesOfAll.concat(edge.node.frontmatter.category);
    }
  });

  return (
    <Layout>
      <SEO title={latestPost.frontmatter.title} />
      <Post
        category={latestPost.frontmatter.category}
        title={latestPost.frontmatter.title}
        date={latestPost.frontmatter.date}
        author={latestPost.frontmatter.author}
        tags={latestPost.frontmatter.tags}
        id={latestPost.id}
        slug={latestPost.fields.slug}
        titlesOfAll={titlesOfAll}
        categoriesOfAll={categoriesOfAll}
        currentPage={1}
        isSinglePage={false}
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
