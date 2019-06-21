import React from "react"
import { Link } from "gatsby"
import { Card, CardTitle, CardText, CardSubtitle, CardBody, Badge } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/helperFunctions"

const Post = ({ title, author, path, date, body, fluid, tags }) => {
  return (
    <Card>
      <Link to={path}>
        <Img className="card-image-top" fluid={fluid} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={path}>{title}</Link>
        </CardTitle>
        <CardSubtitle className="mt-3">
          <span className="text-info">{date}</span>{" "}|{" "}
          <span className="text-info">{author}</span>
        </CardSubtitle>
        <CardText className="mt-2">{body}</CardText>
        <ul className="post-tags">
           {tags.map(tag => (
             <li>
               <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
               </Link>
             </li>
           ))}
        </ul>
        <Link to={path} className="btn btn-outline-primary float-right">
          Read More
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post