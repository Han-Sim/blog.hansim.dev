import React, { useCallback } from "react";
import { navigate } from "gatsby";
import { KEY_ENTER } from "src/util/constants";
import style from "./post.header.module.scss";

const PostHeader = ({ author, category, date, title }) => {
  const handleCategoryOnClick = useCallback(() => {
    navigate(`/all-posts`);
  }, []);

  const handleCategoryOnKeyDown = useCallback(event => {
    if (event.keyCode === KEY_ENTER) {
      navigate(`/all-posts`);
    }
  }, []);

  return (
    <div className={style.postHeaderContainer}>
      <div>
        <div className={style.info}>
          <div
            className={style.category}
            onClick={handleCategoryOnClick}
            onKeyDown={handleCategoryOnKeyDown}
            role="button"
            tabindex={0}
          >
            {category.toUpperCase()}
          </div>
          <div className={style.divider} />
          <div className={style.dateAndAuthor}>
            {date}, {author}
          </div>
        </div>
        <div className={style.title}>{title}</div>
      </div>
    </div>
  );
};

export default PostHeader;
