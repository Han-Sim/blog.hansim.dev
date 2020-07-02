import React from "react";

import { slugify } from "../../../util/helperFunctions";
import style from "./post.header.module.scss";

const PostHeader = ({ author, category, date, title }) => {
  return (
    <div className={style.postHeaderContainer}>
      <div>
        <div className={style.info}>
          <div className={style.category}>
            <a href={`/category/${slugify(category)}`}>
              {category.toUpperCase()}
            </a>
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
