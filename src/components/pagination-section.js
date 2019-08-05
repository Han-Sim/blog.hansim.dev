import React from "react"
import { Link } from "gatsby"
import { Col, Button } from "reactstrap"
import PaginationCard from "./pagination-card"

import leftArrow from "../images/left-arrow.png"
import leftArrowDisabled from "../images/left-arrow-disabled.png"
import rightArrow from "../images/right-arrow.png"
import rightArrowDisabled from "../images/right-arrow-disabled.png"

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
      <Col sm="10" className="markdown-body pagination-section mb-4">
        <h1>{props.sectionTitle}</h1>
      </Col>
      <Col sm="2" className="mb-3 mt-1 pr-5 text-right">
        <Link onClick={props.prev} className="mr-4">
          {props.isFirst ? (
            <img src={leftArrowDisabled} width="24px" alt="Prev" />
          ) : (
            <img
              className="left-arrow"
              src={leftArrow}
              width="24px"
              alt="Prev"
            />
          )}
        </Link>
        <Link onClick={props.next}>
          {props.isLast ? (
            <img src={rightArrowDisabled} width="24px" alt="Next" />
          ) : (
            <img
              className="right-arrow"
              src={rightArrow}
              width="24px"
              alt="Next"
              onClick={props.next}
            />
          )}
        </Link>
      </Col>
      {cards}
    </>
  )
}

export default PaginationSection
