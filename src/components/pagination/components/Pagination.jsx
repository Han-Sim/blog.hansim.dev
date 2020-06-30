import React from "react";
import { Row } from "reactstrap";
import { slugify, findIndex } from "../../../util/helperFunctions";
import PaginationSection from "./Pagination.Section";
import PaginationIndicator from "./Pagination.Indicator";

import style from './pagination.module.scss';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    const { titlesOfAll, categoriesOfAll, title } = props;

    const titles = titlesOfAll.slice(0, 4);
    const categories = categoriesOfAll.slice(0, 4);
    const indexOfAll = findIndex(titlesOfAll, title);
    const thisCategory = categoriesOfAll[indexOfAll];

    let titlesRelatedAll = [];
    categoriesOfAll.forEach((val, i) => {
      if (val === thisCategory) titlesRelatedAll.push(titlesOfAll[i]);
    });
    const titlesRelated = titlesRelatedAll.slice(0, 4);

    this.state = {
      title,
      thisCategory,
      categoriesOfAll,
      titlesOfAll,
      titles,
      categories,
      titlesRelatedAll,
      titlesRelated,
      indexOfAll,
      startIndex: 0,
      startIndexRelated: 0,
    };
  }

  next = e => {
    e.preventDefault();

    // if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex + 4
    //  if newIndex > (9-3) --> newIndex = 9-3 = 6 ---> [6,7,8,9]
    //  if newIndex <= (9-3) --> leave it alone
    this.setState(prevState => {
      let newIndex;
      const lastIndex = prevState.titlesOfAll.length - 1;

      if (prevState.startIndex + 4 > lastIndex - 3)
        newIndex = prevState.titlesOfAll.length - 4;
      else if (prevState.startIndex + 4 <= lastIndex - 3)
        newIndex = prevState.startIndex + 4;

      return {
        startIndex: newIndex,
        titles: prevState.titlesOfAll.slice(newIndex, newIndex + 4),
        categories: prevState.categoriesOfAll.slice(newIndex, newIndex + 4),
      };
    });
  };

  nextRel = e => {
    e.preventDefault();

    this.setState(prevState => {
      let newIndex;
      const lastIndex = prevState.titlesRelatedAll.length - 1;

      if (prevState.startIndexRelated + 4 > lastIndex - 3)
        newIndex = prevState.titlesRelatedAll.length - 4;
      else if (prevState.startIndex + 4 <= lastIndex - 3)
        newIndex = prevState.startIndexRelated + 4;

      return {
        startIndexRelated: newIndex,
        titlesRelated: prevState.titlesRelatedAll.slice(newIndex, newIndex + 4),
      };
    });
  };

  prev = e => {
    e.preventDefault();

    // if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex - 4
    //  if newIndex < 0 --> newIndex = 0
    //  otherwise, newIndex = prevIndex - 4
    this.setState(prevState => {
      let newIndex;

      if (prevState.startIndex - 4 < 0) newIndex = 0;
      else newIndex = prevState.startIndex - 4;

      return {
        startIndex: newIndex,
        titles: prevState.titlesOfAll.slice(newIndex, newIndex + 4),
        categories: prevState.categoriesOfAll.slice(newIndex, newIndex + 4),
      };
    });
  };

  prevRel = e => {
    e.preventDefault();

    // if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex - 4
    //  if newIndex < 0 --> newIndex = 0
    //  otherwise, newIndex = prevIndex - 4
    this.setState(prevState => {
      let newIndex;

      if (prevState.startIndexRelated - 4 < 0) newIndex = 0;
      else newIndex = prevState.startIndexRelated - 4;

      return {
        startIndexRelated: newIndex,
        titlesRelated: prevState.titlesRelatedAll.slice(newIndex, newIndex + 4),
      };
    });
  };

  render() {
    const {
      thisCategory,
      titlesOfAll,
      titles,
      categories,
      titlesRelated,
      titlesRelatedAll,
      indexOfAll,
      startIndex,
      startIndexRelated,
    } = this.state;

    const morePostTitle = [];
    morePostTitle.push(
      <>
        More Posts in{" "}
        <a href={`/category/${slugify(thisCategory)}`}>{thisCategory}</a>
      </>
    );
    
    return (
      <div className={style.container}>
        <Row className="pagination mt-3 mb-5">
          <PaginationIndicator index={indexOfAll} titles={titlesOfAll} />
          <PaginationSection
            sectionTitle={"Recent Posts"}
            titles={titles}
            categories={categories}
            next={this.next}
            prev={this.prev}
            isFirst={startIndex === 0}
            isLast={startIndex >= titlesOfAll.length - 4}
          />
          <PaginationSection
            sectionTitle={morePostTitle}
            titles={titlesRelated}
            category={thisCategory}
            next={this.nextRel}
            prev={this.prevRel}
            isFirst={startIndexRelated === 0}
            isLast={startIndexRelated >= titlesRelatedAll.length - 4}
          />
        </Row>
      </div>
    );
  }
}

export default Pagination;
