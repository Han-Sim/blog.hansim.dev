import React from "react"
import { Link } from "gatsby"
import { Row, Col, Badge } from "reactstrap"
import { slugify, findIndex, isFirst, isLast } from "../util/helperFunctions"
import PaginationCard from "./pagination-card"

//I declared React.Component class here
//  in case to implement more of page re-rendering feature in the future.
//  for now, this component can be a functional component like others.
//
class Pagination extends React.Component {
  constructor(props) {
    super(props)

    const { titlesOfAll, categoriesOfAll, title } = this.props

    const indexInAll = findIndex(titlesOfAll, title)
    const thisCategory = categoriesOfAll[indexInAll]

    //get recent posts+categories of ALL
    const recentTitlesOfAll = []
    const recentCategoriesOfAll = []
    if (indexInAll > 3) {
      for (let i = 0; i < 4; i++) {
        recentTitlesOfAll.push(titlesOfAll[i])
        recentCategoriesOfAll.push(categoriesOfAll[i])
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (i === indexInAll) continue
        recentTitlesOfAll.push(titlesOfAll[i])
        recentCategoriesOfAll.push(categoriesOfAll[i])
      }
    }

    //get recent posts+categories within this category
    const recentTitlesOfThisCategory = []
    for (let i = 0; i < titlesOfAll.length; i++) {
      if (i === indexInAll) continue
      else if (categoriesOfAll[i] === thisCategory) {
        recentTitlesOfThisCategory.push(titlesOfAll[i])
        if (recentTitlesOfThisCategory.length >= 4) break
      }
    }

    this.state = {
      recentTitlesOfAll,
      recentCategoriesOfAll,
      recentTitlesOfThisCategory,
      title,
      categoriesOfAll,
      thisCategory,
      indexInAll,
    }
  }

  render() {
    const {
      recentTitlesOfAll,
      recentCategoriesOfAll,
      recentTitlesOfThisCategory,
      thisCategory,
    } = this.state //destructurize this.state

    //Recent Posts : All
    const cardsOfAll = []
    for (const [index, title] of recentTitlesOfAll.entries()) {
      cardsOfAll.push(
        <Col sm="3">
          <PaginationCard
            title={title}
            category={recentCategoriesOfAll[index]}
          />{" "}
        </Col>
      )
    }

    //Recent Posts : All
    const cardsOfThisCategory = []
    for (const [index, title] of recentTitlesOfThisCategory.entries()) {
      cardsOfThisCategory.push(
        <Col sm="3">
          <PaginationCard title={title} category={thisCategory} />{" "}
        </Col>
      )
    }

    return (
      <Row className="pagination mt-3 mb-5">
        <Col sm="12" className="markdown-body pagination-section mb-4">
          <h1>Recent Posts</h1>
        </Col>
        {cardsOfAll}
        <Col className="see-more text-right mt-3 pr-5">
          <Link className="see-more" to={"/all-posts"}>
            see all posts
          </Link>
        </Col>
        {cardsOfThisCategory.length > 0 && (
          <>
            <Col sm="12" className="markdown-body pagination-section mb-4">
              <h1>
                More Posts in{" "}
                <Link to={`/category/${slugify(thisCategory)}`}>
                  {thisCategory}
                </Link>
              </h1>
            </Col>
            {cardsOfThisCategory}
            {cardsOfThisCategory.length === 4 && (
              <>
                <Col className="see-more text-right mt-3 pr-5">
                  <Link
                    className="see-more"
                    to={`/category/${slugify(thisCategory)}`}
                  >
                    see more posts in {thisCategory}
                  </Link>
                </Col>
              </>
            )}
          </>
        )}
      </Row>
    )
  }
}

export default Pagination
