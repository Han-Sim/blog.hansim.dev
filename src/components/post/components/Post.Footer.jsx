import React from "react";
import PropTypes from "prop-types";
import LabelIcon from "@mui/icons-material/Label";
import Tag from "src/components/tag";

import * as style from "./post.footer.module.scss";

const GIT_HUB_URL =
  "https://github.com/Han-Sim/blog.hansim.dev/tree/master/src/pages/posts";

const Post = ({ filename, tags }) => {
  return (
    <div className={style.postFooterContainer}>
      <div className={style.tagsList}>
        <div className={style.labelIcon}>
          <LabelIcon />
        </div>
        {tags.map((tag, index) => (
          <Tag tag={tag} key={tag} isLastTag={index === tags.length - 1} />
        ))}
      </div>
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
    </div>
  );
};

Post.propTypes = {
  filename: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Post;
