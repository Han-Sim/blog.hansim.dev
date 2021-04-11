import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Pagination from "src/components/pagination";
import PostHeader from "./Post.Header";
import PostFooter from "./Post.Footer";

import style from "./post.module.scss";

// Single post page
const Post = ({
  author,
  category,
  children,
  date,
  filename,
  tags,
  title,
  titlesOfAll,
}) => (
  <div className={style.root}>
    <Container maxWidth="md">
      <div className={style.container}>
        <PostHeader
          author={author}
          category={category}
          date={date}
          title={title}
        />
        <div>{children}</div>
        <PostFooter filename={filename} tags={tags} />
        <Pagination titlesOfAll={titlesOfAll} title={title} />
      </div>
    </Container>
  </div>
);

Post.propTypes = {
  author: PropTypes.string,
  category: PropTypes.string,
  children: PropTypes.node,
  date: PropTypes.string,
  filename: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  titlesOfAll: PropTypes.arrayOf(PropTypes.string),
};

export default Post;
