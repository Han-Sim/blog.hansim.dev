import React from "react"
import { Link } from "gatsby"
import { Row, Col, Button } from "reactstrap"
import { slugify, findIndex } from "../util/helperFunctions"
import PaginationCard from "./pagination-card"

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    const { titlesOfAll, categoriesOfAll, title } = this.props

    const indexInAll = findIndex(titlesOfAll, title)
    const thisCategory = categoriesOfAll[indexInAll]

    //get recent posts+categories within this category
    const titlesOfThisCategory = []
    for (let i = 0; i < titlesOfAll.length; i++) {
      if (i === indexInAll) continue
      else if (categoriesOfAll[i] === thisCategory)
        titlesOfThisCategory.push(titlesOfAll[i])
    }

    this.state = {
      title,
      thisCategory,
      categoriesOfAll,
      titlesOfAll,
      titlesOfThisCategory,
      indexInAll,
      startIndexForAll: 0,
      startIndexForThisCategory: 0,
    }
  }

  nextOfAll = event => {
    event.preventDefault()
    this.setState(prevState => {
      let newStartIndex = prevState.startIndexForAll + 4
      if (newStartIndex < prevState.titlesOfAll.length - 1)
        return { startIndexForAll: newStartIndex }
      else if (newStartIndex > prevState.titlesOfAll.length - 4)
        return { startIndexForAll: prevState.titlesOfAll.length - 4 }
    })
  }

  nextOfThisCategory = event => {
    event.preventDefault()
    this.setState(prevState => {
      let newStartIndex = prevState.startIndexForThisCategory + 4
      if (newStartIndex < prevState.titlesOfThisCategory.length - 1)
        return { startIndexForThisCategory: newStartIndex }
      else if (newStartIndex > prevState.titlesOfThisCategory.length - 4)
        return {
          startIndexForThisCategory: prevState.titlesOfThisCategory.length - 4,
        }
    })
  }

  prevOfAll = event => {
    event.preventDefault()
    this.setState(prevState => {
      let newStartIndex = prevState.startIndexForAll - 4
      if (newStartIndex >= 0) return { startIndexForAll: newStartIndex }
      else if (newStartIndex < 4) return { startIndexForAll: 0 }
    })
  }

  prevOfThisCategory = event => {
    event.preventDefault()
    this.setState(prevState => {
      let newStartIndex = prevState.startIndexForThisCategory - 4
      if (newStartIndex >= 0)
        return { startIndexForThisCategory: newStartIndex }
      else if (newStartIndex < 4) return { startIndexForThisCategory: 0 }
    })
  }

  render() {
    const {
      title,
      thisCategory,
      categoriesOfAll,
      titlesOfAll,
      titlesOfThisCategory,
      indexInAll,
      startIndexForAll,
      startIndexForThisCategory,
    } = this.state //destructurize this.state

    //Recent Posts in All
    const cardsOfAll = []
    for (let i = startIndexForAll; i < startIndexForAll + 4; i++) {
      cardsOfAll.push(
        <Col sm="3" key={i}>
          <PaginationCard
            title={titlesOfAll[i]}
            category={categoriesOfAll[i]}
          />{" "}
        </Col>
      )
    }

    //Recent Posts in this category
    const cardsOfThisCategory = []
    for (
      let i = startIndexForThisCategory;
      i < startIndexForThisCategory + 4;
      i++
    ) {
      cardsOfThisCategory.push(
        <Col sm="3" key={i}>
          <PaginationCard
            title={titlesOfThisCategory[i]}
            category={thisCategory}
          />{" "}
        </Col>
      )
    }

    return (
      <Row className="pagination mt-3 mb-5">
        <Col sm="6" className="markdown-body previous-next-post">
          <h1>Previous Post</h1>
          <div className="title">
            {indexInAll === titlesOfAll.length - 1 ? (
              <a>There is no previous post</a>
            ) : (
              <Link to={slugify(titlesOfAll[indexInAll + 1])}>
                {titlesOfAll[indexInAll + 1]}
              </Link>
            )}
          </div>
        </Col>
        <Col sm="6" className="markdown-body previous-next-post text-right">
          <h1 className="text-right">Next Post</h1>
          <div className="title">
            {indexInAll === 0 ? (
              <a>There is no next post</a>
            ) : (
              <Link to={slugify(titlesOfAll[indexInAll - 1])}>
                {titlesOfAll[indexInAll - 1]}
              </Link>
            )}
          </div>
        </Col>
        <Col sm="12" className="markdown-body pagination-section mb-4">
          <h1>Recent Posts</h1>
        </Col>
        {cardsOfAll}
        <Col sm="12">
          <Button
            size="sm"
            className="float-right ml-3 mr-3"
            onClick={this.nextOfAll}
          >
            Next
          </Button>
          <Button size="sm" className="float-right" onClick={this.prevOfAll}>
            Previous
          </Button>
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
                <Col sm="12">
                  <Button
                    size="sm"
                    className="float-right ml-3 mr-3"
                    onClick={this.nextOfThisCategory}
                  >
                    Next
                  </Button>
                  <Button
                    size="sm"
                    className="float-right"
                    onClick={this.prevOfThisCategory}
                  >
                    Previous
                  </Button>
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
