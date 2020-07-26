import React, { useContext, useMemo, useEffect, useState } from "react";
import { Context } from "src/context";
import { graphql } from "gatsby";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import Layout from "src/components/Layout";
import Posts from "src/components/posts";
import PostCard from "src/components/PostCard";
import SEO from "src/components/seo";
import style from "./tagPosts.module.scss";

const TagPosts = ({ data, pageContext, ...otherProps }) => {
  const { activeMenu, setActiveMenu } = useContext(Context);
  const { tag } = pageContext;
  const [totalCount, setTotalCount] = useState();

  const seoTitle = useMemo(() => `Posts about ${tag}`, [tag]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // pass an empty array as its dependency in order to make this running only on its construction.

  const postsTitleToRender = useMemo(() => {
    return (
      <div className={style.postTitleContainer}>
        {totalCount} post{totalCount === 1 ? " is" : "s are"} related to
        {tag} in this category
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
