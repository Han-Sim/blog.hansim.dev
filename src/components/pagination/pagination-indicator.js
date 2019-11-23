import React from "react";
import { Link } from "gatsby";
import { Col } from "reactstrap";
import { slugify } from "../../util/helperFunctions";

const PaginationSection = ({ index, titles }) => {
  return (
    <>
      <Col sm="6" className="markdown-body previous-next-post">
        <h1>Previous Post</h1>
        <div className="title">
          {index === titles.length - 1 ? (
            <a>There is no previous post</a>
          ) : (
            <Link to={slugify(titles[index + 1])}>{titles[index + 1]}</Link>
          )}
        </div>
      </Col>
      <Col sm="6" className="markdown-body previous-next-post text-right">
        <h1 className="text-right">Next Post</h1>
        <div className="title">
          {index === 0 ? (
            <a>There is no next post</a>
          ) : (
            <Link to={slugify(titles[index - 1])}>{titles[index - 1]}</Link>
          )}
        </div>
      </Col>
    </>
  );
};

export default PaginationSection;
