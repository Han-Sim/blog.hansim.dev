import React, { useCallback } from "react";
import { navigate } from "gatsby";
import { KEY_ENTER } from "src/util/constants";
import style from "./post.header.module.scss";

const PostHeader = ({ author, category, date, title }) => {
  const handleCategoryOnClick = useCallback(() => {
    navigate(`/posts`);
  }, []);

  const handleCategoryOnKeyDown = useCallback(event => {
    if (event.keyCode === KEY_ENTER) {
      navigate(`/posts`);
    }
  }, []);

  return (
    <div className={style.postHeaderContainer}>
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.footer}>
          <div className={style.categoryContainer}>
            <div className={style.category}>Category</div>
            <div
              className={style.categoryName}
              onClick={handleCategoryOnClick}
              onKeyDown={handleCategoryOnKeyDown}
              role="button"
              tabIndex={0}
            >
              {category}
            </div>
          </div>
          <div className={style.authorContainer}>
            <div className={style.writtenBy}>Written by</div>
            <div>{author}</div>
          </div>
          <div className={style.dateContainer}>
            <div className={style.datePublished}>Date published</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
