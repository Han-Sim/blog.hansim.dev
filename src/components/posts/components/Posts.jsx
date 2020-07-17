import React, { useContext, useMemo } from "react";
import { Context } from "src/context";
import PostCard from "src/components/PostCard";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import style from "./posts.module.scss";

const Posts = ({ data, pageTitleText }) => {
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
  }, [data.allMarkdownRemark.edges]);

  return (
    <div className={style.root}>
      {pageTitleText && (
        <div className={style.pageTitleText}>{pageTitleText}</div>
      )}
      <div>{listOfPostsToRender[activeMenu]}</div>
    </div>
  );
};

export default Posts;
