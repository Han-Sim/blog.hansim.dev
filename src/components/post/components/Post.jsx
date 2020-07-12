import React from "react";
import Container from "@material-ui/core/Container";
import { DiscussionEmbed } from "disqus-react";

import Pagination from "src/components/pagination";
import PostHeader from "./Post.Header";
import PostFooter from "./Post.Footer";

import style from "./post.module.scss";

//this is a single post page
const Post = ({
  author,
  categoriesOfAll,
  category,
  children,
  date,
  filename,
  id,
  slug,
  tags,
  title,
  titlesOfAll,
}) => {
  //DisQus plugin
  const baseUrl = "https://dev.hansim.dev";
  const disqusShortname = "blog-hansim-dev";
  const disqusConfig = {
    url: baseUrl + slug,
    identifier: id,
    title: title,
  };

  return (
    <div className={style.root}>
      <Container maxWidth="lg">
        <div className={style.container}>
          <PostHeader
            author={author}
            category={category}
            date={date}
            title={title}
          />
          <div>{children}</div>
          <PostFooter filename={filename} tags={tags} />
          <Pagination
            titlesOfAll={titlesOfAll}
            categoriesOfAll={categoriesOfAll}
            title={title}
          />
          <div className="mt-3">
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Post;
