import React from "react"
import { Link } from "gatsby"
import { Col } from "reactstrap"
import PaginationCard from "./pagination-card"

const PaginationSection = props => {
  const cards = []
  props.titles.forEach((val, i) => {
    cards.push(
      <Col sm="3" key={i}>
        <PaginationCard
          title={val}
          category={props.categories ? props.categories[i] : props.category}
        />{" "}
      </Col>
    )
  })

  return (
    <>
      <Col sm="12" className="markdown-body pagination-section mb-4">
        <h1>{props.sectionTitle}</h1>
      </Col>
      {cards}
      <Col className="see-more text-right mb-3 pr-5">
        <Link className="see-more mr-4" onClick={props.prev}>
          Prev...
        </Link>
        <Link className="see-more" onClick={props.next}>
          Next...
        </Link>
      </Col>
    </>
  )
}

export default PaginationSection
