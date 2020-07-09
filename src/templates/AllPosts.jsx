import React, { useContext, useMemo } from "react";
import { graphql } from "gatsby";
import { Context } from "../context";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/seo";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "../util/constants";
import style from "./allPost.module.scss";

const AllPosts = ({ data }) => {
  const seoTitle = useMemo(() => "All Posts", []);
  // const { totalCount } = data.allMarkdownRemark;
  const { activeMenu } = useContext(Context);

  const listOfPostsToRender = useMemo(() => {
    const obj = {
      [CATEGORY_WEB_DEVELOPMENT]: [],
      [CATEGORY_BASICS]: [],
    };

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.category === CATEGORY_WEB_DEVELOPMENT) {
        obj[CATEGORY_WEB_DEVELOPMENT].push(node);
      }

      if (node.frontmatter.category === CATEGORY_BASICS) {
        obj[CATEGORY_BASICS].push(node);
      }
    });

    return {
      [CATEGORY_WEB_DEVELOPMENT]: obj[CATEGORY_WEB_DEVELOPMENT].map(
        (node, index) => {
          return (
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
          );
        }
      ),
      [CATEGORY_BASICS]: obj[CATEGORY_BASICS].map((node, index) => {
        return (
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
        );
      }),
    };
  }, [data.allMarkdownRemark.edges, PostCard]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <div className={style.root}>
        {/* TODO: header part */}
        <div>{listOfPostsToRender[activeMenu]}</div>
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
          excerpt(format: HTML)
        }
      }
    }
  }
`;

export default AllPosts;
