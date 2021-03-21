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

const Posts = ({ listOfPostsToRender, postsTitleToRender }) => {
  const { activeMenu } = useContext(Context);
  const listOfPostsRef = useRef([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    listOfPostsRef.current = [...listOfPostsToRender[activeMenu]];
    setItems(listOfPostsRef.current.splice(0, 4));
  }, [listOfPostsToRender, activeMenu, setItems]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems([...items, listOfPostsRef.current.splice(0, 4)]);
    }, 500);
  };

  console.log("listOfPostsRef.current", listOfPostsRef.current);

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
  listOfPostsToRender: PropTypes.shape({
    [CATEGORY_ALL_POSTS]: PropTypes.arrayOf(PropTypes.node),
    [CATEGORY_WEB_DEVELOPMENT]: PropTypes.arrayOf(PropTypes.node),
    [CATEGORY_BASICS]: PropTypes.arrayOf(PropTypes.node),
  }),
};

export default Posts;
