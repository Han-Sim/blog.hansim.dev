import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import { Context } from "src/context";
import style from "./posts.module.scss";

const Posts = ({ listOfPostsToRender, postsTitleToRender }) => {
  const { activeMenu } = useContext(Context);

  return (
    <div className={style.root}>
      {postsTitleToRender}
      <div>{listOfPostsToRender[activeMenu]}</div>
    </div>
  );
};

Posts.propTypes = {
  listOfPostsToRender: PropTypes.shape({
    [CATEGORY_WEB_DEVELOPMENT]: PropTypes.arrayOf(PropTypes.node),
    [CATEGORY_BASICS]: PropTypes.arrayOf(PropTypes.node),
  }),
};

export default Posts;
