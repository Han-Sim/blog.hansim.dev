import React from "react";
import Container from "@material-ui/core/Container";
import { Button } from "reactstrap";
import { DiscussionEmbed } from "disqus-react";

import { slugify } from "../../../util/helperFunctions";
import Pagination from "../../pagination";
import PostHeader from "./Post.Header"; // TODO: replace with mui icons.

/* import icons */ import tagIcon from "../../../images/tags.png";
import pencilIcon from "../../../images/pencil.png";

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

  //github post url
  const gitHubUrl =
    "https://github.com/Han-Sim/blog.hansim.dev/tree/master/src/pages/posts";

  return (
    <div className={style.root}>
      <Container maxWidth="lg">
        <PostHeader
          author={author}
          category={category}
          date={date}
          title={title}
        />
        <div className={style.postBodyContainer}>
          {children}
          <div className="edit mb-3">
            <img src={pencilIcon} width="20px" className="mr-2" alt="" />{" "}
            <a
              href={`${gitHubUrl}/${filename}`}
              className="edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edit this post on GitHub
            </a>
          </div>
          <div className="post-tags mb-5">
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
          </div>
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
