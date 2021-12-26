import React, { useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "src/context";
import { graphql } from "gatsby";
import { MENU_ALL_POSTS } from "src/util/constants";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";
import SEO from "src/components/seo";
import style from "./tagPosts.module.scss";

const TagPosts = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;
  const { activeMenu, setActiveMenu } = useContext(Context);
  const { tag } = pageContext;

  // Always set menu to MENU_ALL_POSTS.
  useEffect(() => {
    if (activeMenu !== MENU_ALL_POSTS) {
      setActiveMenu(MENU_ALL_POSTS);
    }
  }, [activeMenu]);

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);

  const postsTitleToRender = useMemo(() => {
    return (
      <div className={style.postTitleContainer}>
        <div className={style.tag}>{tag}</div>found {edges.length} post
        {edges.length === 1 ? "" : "s"}
      </div>
    );
  }, [edges.length, tag]);

  return (
    <Layout>
      <SEO title={seoTitle} />
      <Posts
        tag={tag}
        postsTitleToRender={postsTitleToRender}
        posts={edges.map(({ node }) => node)}
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
