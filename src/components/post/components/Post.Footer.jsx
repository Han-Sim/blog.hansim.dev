import React from "react";
import LabelIcon from "@material-ui/icons/Label";
import Tag from "src/components/tag";

import style from "./post.footer.module.scss";

const GIT_HUB_URL =
  "https://github.com/Han-Sim/blog.hansim.dev/tree/master/src/pages/posts";

const Post = ({ filename, tags }) => {
  return (
    <div className={style.postFooterContainer}>
      <div className={style.editThisPage}>
        <a
          href={`${GIT_HUB_URL}/${filename}`}
          className={style.editThisPageText}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this post on GitHub
        </a>
      </div>
      <div className={style.tags}>
        <div className={style.labelIcon}>
          <LabelIcon />
        </div>
        {tags.map((tag, index) => (
          <Tag tag={tag} key={tag} isLastTag={index === tags.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default Post;
