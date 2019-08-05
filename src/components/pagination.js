import React from "react"
import { Link } from "gatsby"
import { Row, Col } from "reactstrap"
import { slugify, findIndex } from "../util/helperFunctions"
import PaginationCard from "./pagination-card"

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    const { titlesOfAll, categoriesOfAll, title } = this.props
    const titles = titlesOfAll.slice(0, 4)

    const indexOfAll = findIndex(titlesOfAll, title)
    const thisCategory = categoriesOfAll[indexOfAll]

    let titlesRelatedAll = []
    categoriesOfAll.forEach((val, i) => {
      if (val === thisCategory) titlesRelatedAll.push(titlesOfAll[i])
    })
    const titlesRelated = titlesRelatedAll.slice(0, 4)

    this.state = {
      title,
      thisCategory,
      categoriesOfAll,
      titlesOfAll,
      titles,
      titlesRelatedAll,
      titlesRelated,
      indexOfAll,
      startIndex: 0,
      startIndexRelated: 0,
    }
  }

  next = e => {
    e.preventDefault()

    //if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex + 4
    //  if newIndex > (9-3) --> newIndex = 9-3 = 6 ---> [6,7,8,9]
    //  if newIndex <= (9-3) --> leave it alone
    this.setState(prevState => {
      let newIndex
      const lastIndex = prevState.titlesOfAll.length - 1

      if (prevState.startIndex + 4 > lastIndex - 3)
        newIndex = prevState.titlesOfAll.length - 4
      else if (prevState.startIndex + 4 <= lastIndex - 3)
        newIndex = prevState.startIndex + 4

      return {
        startIndex: newIndex,
        titles: prevState.titlesOfAll.slice(newIndex, newIndex + 4),
      }
    })
  }

  nextRel = e => {
    e.preventDefault()

    this.setState(prevState => {
      let newIndex
      const lastIndex = prevState.titlesRelatedAll.length - 1

      if (prevState.startIndexRelated + 4 > lastIndex - 3)
        newIndex = prevState.titlesRelatedAll.length - 4
      else if (prevState.startIndex + 4 <= lastIndex - 3)
        newIndex = prevState.startIndexRelated + 4

      return {
        startIndexRelated: newIndex,
        titlesRelated: prevState.titlesRelatedAll.slice(newIndex, newIndex + 4),
      }
    })
  }

  prev = e => {
    e.preventDefault()

    //if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex - 4
    //  if newIndex < 0 --> newIndex = 0
    //  otherwise, newIndex = prevIndex - 4
    this.setState(prevState => {
      let newIndex

      if (prevState.startIndex - 4 < 0) newIndex = 0
      else newIndex = prevState.startIndex - 4

      return {
        startIndex: newIndex,
        titles: prevState.titlesOfAll.slice(newIndex, newIndex + 4),
      }
    })
  }

  prevRel = e => {
    e.preventDefault()

    //if titlesOfAll.length == 10 --> [0,....,9]
    //  newIndex = prevIndex - 4
    //  if newIndex < 0 --> newIndex = 0
    //  otherwise, newIndex = prevIndex - 4
    this.setState(prevState => {
      let newIndex

      if (prevState.startIndexRelated - 4 < 0) newIndex = 0
      else newIndex = prevState.startIndexRelated - 4

      return {
        startIndexRelated: newIndex,
        titlesRelated: prevState.titlesRelatedAll.slice(newIndex, newIndex + 4),
      }
    })
  }

  render() {
    const {
      title,
      thisCategory,
      categoriesOfAll,
      titlesOfAll,
      titles,
      titlesRelatedAll,
      titlesRelated,
      indexOfAll,
      startIndex,
      startIndexRelated,
    } = this.state //destructurize this.state

    //Posts : All
    const cardsOfAll = []
    titles.forEach((val, i) => {
      cardsOfAll.push(
        <Col sm="3" key={i}>
          <PaginationCard title={val} category={categoriesOfAll[i]} />{" "}
        </Col>
      )
    })

    //Posts : Related
    const cardsRelated = []
    titlesRelated.forEach((val, i) => {
      cardsRelated.push(
        <Col sm="3" key={i}>
          <PaginationCard title={val} category={thisCategory} />{" "}
        </Col>
      )
    })

    return (
      <Row className="pagination mt-3 mb-5">
        <Col sm="6" className="markdown-body previous-next-post">
          <h1>Previous Post</h1>
          <div className="title">
            {indexOfAll === titlesOfAll.length - 1 ? (
              <a>There is no previous post</a>
            ) : (
              <Link to={slugify(titlesOfAll[indexOfAll + 1])}>
                {titlesOfAll[indexOfAll + 1]}
              </Link>
            )}
          </div>
        </Col>
        <Col sm="6" className="markdown-body previous-next-post text-right">
          <h1 className="text-right">Next Post</h1>
          <div className="title">
            {indexOfAll === 0 ? (
              <a>There is no next post</a>
            ) : (
              <Link to={slugify(titlesOfAll[indexOfAll - 1])}>
                {titlesOfAll[indexOfAll - 1]}
              </Link>
            )}
          </div>
        </Col>
        <Col sm="12" className="markdown-body pagination-section mb-4">
          <h1>Recent Posts</h1>
        </Col>
        {cardsOfAll}
        <Col className="see-more text-right mb-3 pr-5">
          <Link className="see-more mr-4" onClick={this.prev}>
            Prev...
          </Link>
          <Link className="see-more" onClick={this.next}>
            Next...
          </Link>
        </Col>
        {cardsRelated.length > 0 && (
          <>
            <Col sm="12" className="markdown-body pagination-section mb-4">
              <h1>
                More Posts in{" "}
                <Link to={`/category/${slugify(thisCategory)}`}>
                  {thisCategory}
                </Link>
              </h1>
            </Col>
            {cardsRelated}
            {cardsRelated.length === 4 && (
              <>
                <Col className="see-more text-right mb-3 pr-5">
                  <Link className="see-more mr-4" onClick={this.prevRel}>
                    Prev...
                  </Link>
                  <Link className="see-more" onClick={this.nextRel}>
                    Next...
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
