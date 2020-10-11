import React from "react";
import Container from "@material-ui/core/Container";
import Pagination from "src/components/pagination";
import PostHeader from "./Post.Header";
import PostFooter from "./Post.Footer";

import style from "./post.module.scss";

//this is a single post page
const Post = ({
  author,
  category,
  children,
  date,
  filename,
  id,
  slug,
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

export default Post;
