import React from "react";
import { Link } from "gatsby";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import style from "./post.header.module.scss";

const PostHeader = ({ author, category, date, title }) => {
  return (
    <>
      <div className={style.container}>
        <div>
          <div className={style.info}>
            <div className={style.category}>
              <Link to={`/category/${category.toLowerCase()}`}>{category.toUpperCase()}</Link>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={style.dateAndAuthor}>
              {date}, {author}
            </div>
          </div>
          <div className={style.title}>{title}</div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
