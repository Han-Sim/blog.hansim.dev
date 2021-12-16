import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  CATEGORY_ALL_POSTS,
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
} from "src/util/constants";
import { Context } from "src/context";
import style from "./posts.module.scss";

const Posts = ({ posts, postsTitleToRender }) => {
  const { activeMenu } = useContext(Context);
  const postsRef = useRef([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    postsRef.current = [...posts[activeMenu]];
    setItems(postsRef.current.splice(0, 4));
  }, [posts, activeMenu, setItems]);

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
  posts: PropTypes.shape({
    [CATEGORY_ALL_POSTS]: PropTypes.arrayOf(PropTypes.node),
    [CATEGORY_WEB_DEVELOPMENT]: PropTypes.arrayOf(PropTypes.node),
    [CATEGORY_BASICS]: PropTypes.arrayOf(PropTypes.node),
  }),
  postsTitleToRender: PropTypes.node,
};

export default Posts;
