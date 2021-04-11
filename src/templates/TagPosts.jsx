import React, { useContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "src/context";
import { graphql } from "gatsby";
import {
  CATEGORY_ALL_POSTS,
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
} from "src/util/constants";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";
import PostCard from "src/components/postCard";
import SEO from "src/components/seo";
import style from "./tagPosts.module.scss";

const TagPosts = ({ data, pageContext }) => {
  const { activeMenu, setActiveMenu } = useContext(Context);
  const { tag } = pageContext;
  const [totalCount, setTotalCount] = useState();

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);

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

    const totalCount = listOfPosts[activeMenu].length;
    setTotalCount(totalCount);

    return listOfPosts;
  }, [data.allMarkdownRemark.edges, setTotalCount, activeMenu]);

  // Check if there are some posts found here in this tap (web development).
  // If there is none, set it to the another category.
  // This entry happens when user enters this tag posts page directly, since web development is default.
  // So run this only when its construction.
  useEffect(() => {
    if (totalCount === 0 && activeMenu === CATEGORY_WEB_DEVELOPMENT) {
      setActiveMenu(CATEGORY_BASICS);
    }
  }, []); // pass an empty array as its dependency in order to make this running only on its construction.

  const postsTitleToRender = useMemo(() => {
    return (
      <div className={style.postTitleContainer}>
        <div className={style.tag}>{tag}</div>found {totalCount} post
        {totalCount === 1 ? "" : "s"}.
      </div>
    );
  }, [tag, totalCount]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts
        tag={tag}
        postsTitleToRender={postsTitleToRender}
        listOfPostsToRender={listOfPostsToRender}
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
            date(formatString: "MMM Do, YYYY")
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

TagPosts.propTypes = {
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
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
  }),
};

export default TagPosts;
