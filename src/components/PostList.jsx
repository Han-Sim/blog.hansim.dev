import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap";
import { slugify } from "../util/helperFunctions";

const PostList = ({ title, author, slug, date, body, tags }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <a href={`/${slug}`}>
            <h1>{title}</h1>
          </a>
        </CardTitle>
        <CardSubtitle className="mt-4">
          <span className="post-info">{date}</span> |{" "}
          <span className="post-info">{author}</span>
        </CardSubtitle>
        <CardText className="mt-3 post-contents">{body}</CardText>
        <div className="post-tags mt-5">
          {tags.map((tag, index) => (
            <a href={`/tag/${slugify(tag)}`} key={index}>
              <Badge color="primary" className="mr-1">
                {tag}
              </Badge>
            </a>
          ))}
        </div>
        <a href={`/${slug}`} className="btn btn-outline-primary float-right mt-3">
          Read More
        </a>
      </CardBody>
    </Card>
  );
};

export default PostList;
