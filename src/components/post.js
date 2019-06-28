import React from "react"
import { Button } from "reactstrap"
import { slugify } from "../util/helperFunctions"
import { DiscussionEmbed } from "disqus-react"

import Page from "./page"

/* import icons */
import tagIcon from "../images/tags.png"

//this is a single post page
const Post = ({
  children,
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
          <div className="post-info text-center">
            {date}, {author}
          </div>
        </div>
      </div>
      {children}
      <div className="container post-tags py-5">
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
      <div className="container mt-3">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </>
  )
}

export default Post
