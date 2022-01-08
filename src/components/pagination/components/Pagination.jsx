import React, { useMemo } from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { slugify, findIndex } from "src/util/helpers";
import { InternalLinkPostTitle } from "../../styled";
import {
  PaginationRootContainer,
  PostTitleLabel,
  PreviousPostContainer,
} from "./pagination.styled";

const Pagination = ({ title, titlesOfAll }) => {
  const index = useMemo(() => findIndex(titlesOfAll, title), [
    title,
    titlesOfAll,
  ]);
  const hasPrevPost = useMemo(() => index < titlesOfAll.length - 1, [
    index,
    titlesOfAll,
  ]);
  const hasNextPost = useMemo(() => index > 0, [index]);

  return (
    <PaginationRootContainer>
      <div>
        {hasNextPost && (
          <>
            <PostTitleLabel>Next Post</PostTitleLabel>
            <InternalLinkPostTitle
              onClick={() => {
                navigate(`/${slugify(titlesOfAll[index - 1])}`);
              }}
            >
              {titlesOfAll[index - 1]}
            </InternalLinkPostTitle>
          </>
        )}
      </div>
      <PreviousPostContainer>
        {hasPrevPost && (
          <>
            <PostTitleLabel>Previous Post</PostTitleLabel>
            <InternalLinkPostTitle
              onClick={() => {
                navigate(`/${slugify(titlesOfAll[index + 1])}`);
              }}
            >
              {titlesOfAll[index + 1]}
            </InternalLinkPostTitle>
          </>
        )}
      </PreviousPostContainer>
    </PaginationRootContainer>
  );
};

Pagination.propTypes = {
  title: PropTypes.string,
  titlesOfAll: PropTypes.arrayOf(PropTypes.string),
};

export default Pagination;
