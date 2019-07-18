import React from "react"
import { Button, Badge } from "reactstrap"
import { slugify } from "../util/helperFunctions"
import { DiscussionEmbed } from "disqus-react"

import Page from "./page"

/* import icons */
import tagIcon from "../images/tags.png"

//this is a single post page
const Post = ({
  children,
  category,
  title,
  author,
  date,
  tags,
  id,
  slug,
  currentPage,
  numOfPages,
  isSinglePage,
}) => {
  //DisQus plugin
  const baseUrl = "https://dev.hansim.dev"
  const disqusShortname = "blog-hansim-dev"
  const disqusConfig = {
    url: baseUrl + slug,
    identifier: id,
    title: title,
  }

  return (
    <>
      <div className="post-header-area">
        <div className="post-header">
          <div className="post-title">
            <h1>{title}</h1>
          </div>
          <div className="text-center post-category mt-3 mb-1">
            <Badge href={`/category/${category}`} color="dark">
              {category}
            </Badge>
          </div>
          <div className="post-info text-center mt-5">
            {date}, {author}
          </div>
        </div>
      </div>
      <div className="container py-5 px-5">
        {children}
        <div className="post-tags mb-5">
          <img src={tagIcon} alt="TAGS : " />
          {tags.map(tag => (
            <Button
              id={tag}
              size="sm"
              color="primary"
              href={`/tag/${slugify(tag)}`}
              className="m-1 tags"
            >
              {tag}
            </Button>
          ))}
        </div>
        {isSinglePage ? (
          <></>
        ) : (
          <Page currentPage={currentPage} numOfPages={numOfPages} />
        )}
        <div className="mt-3">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </div>
    </>
  )
}

export default Post
