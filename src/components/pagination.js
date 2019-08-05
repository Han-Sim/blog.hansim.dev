import React from "react"
import { Link } from "gatsby"
import { Row, Col } from "reactstrap"
import { slugify, findIndex } from "../util/helperFunctions"
import PaginationCard from "./pagination-card"

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    const { titlesOfAll, categoriesOfAll, title } = this.props

    const indexOfAll = findIndex(titlesOfAll, title)
    const thisCategory = categoriesOfAll[indexOfAll]

    const titlesRelated = []
    categoriesOfAll.forEach((val, i) => {
      if (val === thisCategory) titlesRelated.push(titlesOfAll[i])
    })
    console.log(titlesRelated)

    this.state = {
      title,
      categoriesOfAll,
      thisCategory,
      titlesOfAll,
      titlesRelated,
      indexOfAll,
    }
  }

  render() {
    const {
      title,
      categoriesOfAll,
      thisCategory,
      titlesOfAll,
      titlesRelated,
      indexOfAll,
    } = this.state //destructurize this.state

    //Posts : All
    const cardsOfAll = []
    titlesOfAll.forEach((val, i) => {
      cardsOfAll.push(
        <Col sm="3" key={i}>
          <PaginationCard
            title={val}
            category={categoriesOfAll[i]}
          />{" "}
        </Col>
      )
    })

    //Posts : All
    const cardsRelated = []
    titlesRelated.forEach((val, i) => {
      cardsRelated.push(
        <Col sm="3" key={i}>
          <PaginationCard
            title={val}
            category={thisCategory}
          />{" "}
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
          <Link className="see-more mr-4" to={"/all-posts"}>
            See Less...
          </Link>
          <Link className="see-more" to={"/all-posts"}>
            See More...
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
                  <Link
                    className="see-more"
                    to={`/category/${slugify(thisCategory)}`}
                  >
                    See More...
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
