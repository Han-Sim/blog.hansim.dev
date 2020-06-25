import React from "react";
import { Button, Badge } from "reactstrap";
import { slugify } from "../util/helperFunctions";
import { DiscussionEmbed } from "disqus-react";

import Pagination from "./pagination/pagination";

/* import icons */
import tagIcon from "../images/tags.png";
import pencilIcon from "../images/pencil.png";

//this is a single post page
const Post = ({
  children,
  category,
  title,
  titlesOfAll,
  categoriesOfAll,
  author,
  date,
  tags,
  id,
  slug,
  filename,
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
    <>
      <div className="post-header-area">
        <div>
          <div className="post-title">
            <h1>{title}</h1>
          </div>
          <div className="text-center post-category mb-1">
            <Badge href={`/category/${category}`} color="dark">
              {category}
            </Badge>
          </div>
          <div className="post-info text-center mt-5">
            {date}, {author}
          </div>
        </div>
      </div>
      <div className="container">
        {children}
        <div className="edit mb-3">
          <img src={pencilIcon} width="20px" className="mr-2" alt=""/>{" "}
          <a href={`${gitHubUrl}/${filename}`} className="edit" target="_blank" rel="noopener noreferrer">
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
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </div>
    </>
  );
};

export default Post;
