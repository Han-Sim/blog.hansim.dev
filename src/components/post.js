import React from "react"
import { Button, Badge } from "reactstrap"
import { slugify } from "../util/helperFunctions"
import { DiscussionEmbed } from "disqus-react"

import Pagination from "./pagination"

/* import icons */
import tagIcon from "../images/tags.png"

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
        <div className="post-tags mb-5">
          <img src={tagIcon} alt="TAGS : " />
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
  )
}

export default Post
