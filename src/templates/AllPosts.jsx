import React, { useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import {
  CATEGORY_ALL_POSTS,
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
  const { setActiveMenu } = useContext(Context);

  useEffect(() => {
    switch (path) {
      case PATH_ALL_POSTS:
        setActiveMenu(CATEGORY_ALL_POSTS);
        break;

      case PATH_CATEGORY_BASICS: {
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
        return "Programming basics";
      case PATH_CATEGORY_WEB_DEVELOPMENT:
        return "Web development";
    }
  }, [path]);

  const listOfPostsToRender = useMemo(() => {
    const obj = {
      [CATEGORY_ALL_POSTS]: [],
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

      obj[CATEGORY_ALL_POSTS].push(node);
    });

    const listOfPosts = {
      [CATEGORY_ALL_POSTS]: obj[CATEGORY_ALL_POSTS].map(node => {
        return (
          <PostCard
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
          />
        );
      }),
      [CATEGORY_WEB_DEVELOPMENT]: obj[CATEGORY_WEB_DEVELOPMENT].map(node => {
        return (
          <PostCard
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
          />
        );
      }),
      [CATEGORY_BASICS]: obj[CATEGORY_BASICS].map(node => {
        return (
          <PostCard
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
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

AllPosts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string,
          category: PropTypes.string,
          date: PropTypes.string,
          tags: PropTypes.arrayOf(PropTypes.string),
          title: PropTypes.string,
        })
      ),
    }),
  }),
  path: PropTypes.string,
};

export default AllPosts;
