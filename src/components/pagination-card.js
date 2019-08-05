import React from "react"
import { Link } from "gatsby"
import { Card, CardBody, CardTitle } from "reactstrap"
import { slugify } from "../util/helperFunctions"

const PaginationCard = ({ title, category }) => {
  return (
    <Card>
      <Link to={slugify(title)}>
        <CardBody>{title}</CardBody>
      </Link>
      <div className="category-badge text-center">
        <Link to={`/category/${slugify(category)}`}>{category}</Link>
      </div>
    </Card>
  )
}

export default PaginationCard
