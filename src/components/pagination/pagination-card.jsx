import React from "react";
import { Card, CardBody } from "reactstrap";
import { slugify } from "../../util/helperFunctions";

const PaginationCard = ({ title, category }) => {
  return (
    <Card>
      <a href={`/${slugify(title)}`}>
        <CardBody>{title}</CardBody>
      </a>
      <div className="category-badge text-center">
        <a href={`/category/${slugify(category)}`}>{category}</a>
      </div>
    </Card>
  );
};

export default PaginationCard;
