import React, { useEffect, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "src/components/postCard";
import style from "./posts.module.scss";

const Posts = ({ posts, postsTitleToRender }) => {
  console.log({ posts });
  const postsRef = useRef([]);
  const [items, setItems] = useState([]);

  // Set an array of PostCard component to render.
  const postCardsToRender = useMemo(() =>
    posts.map(node => (
      <PostCard
        key={node.id}
        title={node.frontmatter.title}
        author={node.frontmatter.author}
        slug={node.fields.slug}
        date={node.frontmatter.date}
        body={node.excerpt}
        tags={node.frontmatter.tags}
      />
    ))
  );

  useEffect(() => {
    postsRef.current = [...postCardsToRender];
    setItems(postsRef.current.splice(0, 4));
  }, [posts]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems([...items, postsRef.current.splice(0, 4)]);
    }, 500);
  };

  return (
    <div className={style.root}>
      {postsTitleToRender}
      <InfiniteScroll dataLength={items.length} next={fetchMoreData} hasMore>
        {items.map(item => item)}
      </InfiniteScroll>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    })
  ),
  postsTitleToRender: PropTypes.node,
};

export default Posts;
