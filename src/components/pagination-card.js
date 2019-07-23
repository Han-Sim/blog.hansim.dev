import React from "react"
import { Link } from "gatsby"
import { Card, CardBody, CardTitle, CardSubtitle, Badge } from "reactstrap"
import { slugify } from "../util/helperFunctions"

const PaginationCard = ({ title, category }) => {
  return (
    <Card>
      <CardBody>
        <Link to={slugify(title)}>
          <CardTitle>{title}</CardTitle>
        </Link>
      </CardBody>
      <Link to={`/category/${slugify(category)}`}>
        <div className="category-badge text-center">{category}</div>
      </Link>
    </Card>
  )
}

export default PaginationCard
