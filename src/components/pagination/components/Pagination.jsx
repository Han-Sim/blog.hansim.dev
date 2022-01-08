import React, { useMemo } from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { KEY_ENTER } from "src/util/constants";
import { slugify, findIndex } from "src/util/helpers";
import style from "./pagination.module.scss";

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
    <div className={style.container}>
      <div className={style.nextContainer}>
        {hasNextPost && (
          <>
            <div className={style.nextPost}>Next Post</div>
            <div
              className={style.postTitle}
              onClick={() => {
                navigate(`/${slugify(titlesOfAll[index - 1])}`);
              }}
              onKeyDown={event => {
                if (event.keyCode === KEY_ENTER) {
                  navigate(`/${slugify(titlesOfAll[index - 1])}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {titlesOfAll[index - 1]}
            </div>
          </>
        )}
      </div>
      <div className={style.previousContainer}>
        {hasPrevPost && (
          <>
            <div className={style.previousPost}>Previous Post</div>
            <div
              className={style.postTitle}
              onClick={() => {
                navigate(`/${slugify(titlesOfAll[index + 1])}`);
              }}
              onKeyDown={event => {
                if (event.keyCode === KEY_ENTER) {
                  navigate(`/${slugify(titlesOfAll[index + 1])}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {titlesOfAll[index + 1]}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  title: PropTypes.string,
  titlesOfAll: PropTypes.arrayOf(PropTypes.string),
};

export default Pagination;
