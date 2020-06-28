import React from "react";
import Button from '@material-ui/core/Button';
import { slugify } from "../../../util/helperFunctions";

import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';

import style from "./post.footer.module.scss";

const GIT_HUB_URL =
  "https://github.com/Han-Sim/blog.hansim.dev/tree/master/src/pages/posts";

//this is a single post page
const Post = ({ filename, tags }) => {
  return (
    <div className={style.postFooterContainer}>
      <div className={style.editThisPage}>
        <EditIcon />
        <a
          href={`${GIT_HUB_URL}/${filename}`}
          className={style.editThisPageText}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this post on GitHub
        </a>
      </div>
      {/* <div className="post-tags mb-5">
        <img src={tagIcon} alt="TAGS : " width="16px" />
        {tags.map(tag => (
          <Button
            key={tag}
            size="sm"
            color="primary"
            href={`/tag/${slugify(tag)}`}
            className="m-1 tags"
          >
            {tag}
          </Button>
        ))}
      </div> */}
    </div>
  );
};

export default Post;
