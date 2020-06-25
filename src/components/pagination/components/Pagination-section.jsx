import React from "react";
import { Col } from "reactstrap";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import PaginationCard from "./Pagination-card";

const PaginationSection = props => {
  const cards = [];
  props.titles.forEach((val, i) => {
    cards.push(
      <Col sm="3" key={`Col-${i}-${val}`}>
        <PaginationCard
          key={`Card-${i}-${val}`}
          title={val}
          category={props.categories ? props.categories[i] : props.category}
        />{" "}
      </Col>
    );
  });

  return (
    <>
      <Col sm="10" className="markdown-body pagination-section mb-4">
        <h1>{props.sectionTitle}</h1>
      </Col>
      <Col sm="2" className="mb-3 mt-1 text-right">
        <IconButton
          aria-label="before"
          disabled={props.isFirst}
          onClick={props.prev}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          aria-label="next"
          disabled={props.isLast}
          onClick={props.next}
        >
          <NavigateNextIcon />
        </IconButton>
      </Col>
      {cards}
    </>
  );
};

export default PaginationSection;
