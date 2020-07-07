import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { slugify } from "../../../util/helperFunctions";
import Tag from "../../tag";
import style from "./postCard.module.scss";

const PostCard = ({ title, author, slug, date, body, tags }) => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.title}>
            <a href={`/${slug}`}>{title}</a>
          </div>
          <div className={style.dateAndAuthor}>
            {date}, {author}
          </div>
        </div>
        <div className={style.body}>
          <div
            className={style.bodyHtml}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <div className={style.tags}>
          {tags.map(tag => (
            <Tag tag={tag} variant="outlined" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
