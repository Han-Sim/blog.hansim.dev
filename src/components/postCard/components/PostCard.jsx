import React from "react";
import Tag from "src/components/tag";
import style from "./postCard.module.scss";

const PostCard = ({ title, author, slug, date, body, tags, index }) => {
  return (
    <div className={style.container}>
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
        <div className={style.tagsContainer}>
          <div className={style.tags}>Tags</div>
          <div className={style.tagsList}>
            {tags.map((tag, index) => (
              <Tag
                tag={tag}
                variant="outlined"
                isLastTag={index === tags.length - 1}
              />
            ))}
          </div>
        </div>
        <div className={style.authorContainer}>
          <div className={style.writtenBy}>Written by</div>
          <div className={style.author}>{author}</div>
        </div>
        <div className={style.dateContainer}>
          <div className={style.datePublished}>Date published</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
