import React from "react"
import { Link } from "gatsby"
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap"
//import Img from "gatsby-image"
import { slugify } from "../util/helperFunctions"

const PostList = ({ title, author, slug, date, body, fluid, tags }) => {
  return (
    <Link to={slug}>
      <Card>
        <CardBody>
          <CardTitle>
            <Link to={slug}>
              <h1 className="effect-underline">{title}</h1>
            </Link>
          </CardTitle>
          <CardSubtitle className="mt-3">
            <span className="text-info">{date}</span> |{" "}
            <span className="text-info">{author}</span>
          </CardSubtitle>
          <CardText className="mt-2">{body}</CardText>
          <ul className="post-tags">
            {tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={slug} className="btn btn-outline-primary float-right">
            Read More
          </Link>
        </CardBody>
      </Card>
  </Link>
  )
}

export default PostList
