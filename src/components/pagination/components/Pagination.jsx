import React, { useMemo } from "react";
import { slugify, findIndex } from "src/util/helpers";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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

  // TODO: cool animation for arrow back/forward icons on hover
  return (
    <div className={style.container}>
      <div className={style.nextContainer}>
        <div className={style.nextPost}>Next</div>
        {hasNextPost ? (
          <div className={style.linkContainer}>
            <a href={`/${slugify(titlesOfAll[index - 1])}`}>
              <div className={style.postTitle}>{titlesOfAll[index - 1]}</div>
            </a>
            <div className={style.arrowIcon}>
              <ArrowForwardIcon />
            </div>
          </div>
        ) : (
          <div className={style.nextNone}>no more next post</div>
        )}
      </div>
      <div className={style.previousContainer}>
        <div className={style.previousPost}>Previous</div>
        {hasPrevPost ? (
          <div className={style.linkContainer}>
            <a href={`/${slugify(titlesOfAll[index + 1])}`}>
              <div className={style.postTitle}>{titlesOfAll[index + 1]}</div>
            </a>
            <div className={style.arrowIcon}>
              <ArrowBackIcon />
            </div>
          </div>
        ) : (
          <div className={style.previousNone}>no more previous post</div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
