import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import { slugify, findIndex } from "src/util/helperFunctions";
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
      <Grid container spacing={3}>
        <Grid item md={6}>
          <div className={style.previousPostText}>Previous Post</div>
          {hasPrevPost ? (
            <a href={`/${slugify(titlesOfAll[index + 1])}`}>
              <div className={style.previous}>
                <div className={style.postTitle}>{titlesOfAll[index + 1]}</div>
              </div>
            </a>
          ) : (
            <div className={`${style.previous} ${style.previousNone}`}>
              <div className={style.textInd}>Previous Post</div>
              <div className={style.postTitle}>no more previous post</div>
            </div>
          )}
        </Grid>
        <Grid
          item
          md={6}
          classes={{
            item: style.gridItem,
          }}
        >
          <div className={style.nextPostText}>Next Post</div>
          {hasNextPost ? (
            <a href={`/${slugify(titlesOfAll[index - 1])}`}>
              <div className={style.next}>
                <div className={style.postTitle}>{titlesOfAll[index - 1]}</div>
              </div>
            </a>
          ) : (
            <div className={`${style.next} ${style.nextNone}`}>
              <div className={style.postTitle}>no more next post</div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Pagination;
