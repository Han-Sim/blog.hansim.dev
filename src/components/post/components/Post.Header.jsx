import React from "react";
import PropTypes from "prop-types";
import style from "./post.header.module.scss";

const PostHeader = ({ author, date, title }) => {
  return (
    <div className={style.postHeaderContainer}>
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.footer}>
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

PostHeader.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
};

export default PostHeader;
