import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { CATEGORY_WEB_DEVELOPMENT, CATEGORY_BASICS } from "src/util/constants";
import { Context } from "src/context";
import style from "./posts.module.scss";

const Posts = ({ data, tag, setTotalCount, listOfPostsToRender }) => {
  const { activeMenu } = useContext(Context);

  // const tagPostsTitleText = useMemo(() => {
  //   if (tag && setTotalCount) {
  //     const totalCount = listOfPostsToRender[activeMenu].length;
  //     setTotalCount(totalCount);

  //     return `${totalCount} post${
  //       totalCount === 1 ? " is" : "s are"
  //     } related to ${tag} in this category`;
  //   }
  // }, [activeMenu, listOfPostsToRender, tag, setTotalCount]);

  return (
    <div className={style.root}>
      {/* {tag && <div className={style.pageTitleText}>{tagPostsTitleText}</div>} */}
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
