/*
 reactstrap: https://reactstrap.github.io/components/pagination/
*/

import React from "react"
import _ from "lodash"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const Page = ({ currentPage, numOfPages }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numOfPages
  const previousPage =
    currentPage - 1 === 1 ? "/" : "/page/" + (currentPage - 1).toString()
  const nextPage = "/page/" + (currentPage + 1).toString()

  return (
    <Pagination className="pagination justify-content-center" aria-label="Page navigation text-center">
      {isFirstPage ? (
        <PaginationItem disabled>
          <PaginationLink previous href="/"></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={previousPage}></PaginationLink>
        </PaginationItem>
      )}
      {Array.from({ length: numOfPages }, (_, index) =>
        currentPage === index + 1 ? (
          <PaginationItem active key={`page-number${index + 1}`}>
            <PaginationLink
              href={`/${index === 0 ? "" : "page/" + (index + 1)}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`page-number${index + 1}`}>
            <PaginationLink
              href={`/${index === 0 ? "" : "page/" + (index + 1)}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}
      {isLastPage ? (
        <PaginationItem disabled>
          <PaginationLink next href="/"></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      )}
    </Pagination>
  )
}

export default Page
