import React from "react";
import Tag from "../../tag";
import style from "./postCard.module.scss";

const PostCard = ({ title, author, slug, date, body, tags, index }) => {
  return (
    <div
      className={
        index % 2 === 0
          ? style.container
          : `${style.container} ${style.otherBorderColor}`
      }
    >
      <div className={style.header}>
        <div className={style.title}>
          <a href={`/${slug}`}>{title}</a>
        </div>
      </div>
      <div className={style.body}>
        <div
          className={style.bodyHtml}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
      <div className={style.footer}>
        <div className={style.tags}>
          {tags.map(tag => (
            <Tag tag={tag} variant="outlined" />
          ))}
        </div>
        <div className={style.dateAndAuthor}>
          {date}, {author}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
