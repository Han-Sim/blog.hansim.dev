import React, { useContext, useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import {
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
  PATH_ALL_POSTS,
  PATH_CATEGORY_BASICS,
  PATH_CATEGORY_WEB_DEVELOPMENT,
} from "src/util/constants";
import { Context } from "src/context";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import PostCard from "src/components/postCard";
import Posts from "src/components/posts";

const AllPosts = ({ data, path }) => {
  const { activeMenu, setActiveMenu } = useContext(Context);
  console.log("activeMenu", activeMenu);

  useEffect(() => {
    console.log("path", path);

    switch (path) {
      // case PATH_ALL_POSTS:
      //   return setActiveMenu(CATEGORY_ALL_POSTS);
      case PATH_CATEGORY_BASICS: {
        console.log("PATH_CATEGORY_BASICS", PATH_CATEGORY_BASICS);
        setActiveMenu(CATEGORY_BASICS);
        break;
      }
      case PATH_CATEGORY_WEB_DEVELOPMENT: {
        setActiveMenu(CATEGORY_WEB_DEVELOPMENT);
        break;
      }
    }
  }, [path, setActiveMenu]);

  const seoTitle = useMemo(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        return "All posts";
      case PATH_CATEGORY_BASICS:
        return "Posts about programming basics";
      case PATH_CATEGORY_WEB_DEVELOPMENT:
        return "Posts about web development";
    }
  }, [path]);

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

    const listOfPosts = {
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

    return listOfPosts;
  }, [data.allMarkdownRemark.edges]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts listOfPostsToRender={listOfPostsToRender} />
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
            date(formatString: "MMM Do, YYYY")
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
