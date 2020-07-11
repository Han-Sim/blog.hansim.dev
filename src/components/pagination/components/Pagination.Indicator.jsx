import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import { slugify } from "../../../util/helperFunctions";
import style from "./pagination.indicator.module.scss";

const PaginationIndicator = ({ index, titles }) => {
  const hasPrevPost = useMemo(() => index < titles.length - 1, [index, titles]);
  const hasNextPost = useMemo(() => index > 0, [index]);

  return (
    <div className={style.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={style.previousPostText}>Previous Post</div>
          {hasPrevPost ? (
            <a href={`/${slugify(titles[index + 1])}`}>
              <div className={style.previous}>
                <div className={style.postTitle}>{titles[index + 1]}</div>
              </div>
            </a>
          ) : (
            <div className={`${style.previous} ${style.previousNone}`}>
              <div className={style.textInd}>Previous Post</div>
              <div className={style.postTitle}>no more previous post</div>
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <div className={style.nextPostText}>Next Post</div>
          {hasNextPost ? (
            <a href={`/${slugify(titles[index - 1])}`}>
              <div className={style.next}>
                <div className={style.postTitle}>{titles[index - 1]}</div>
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

export default PaginationIndicator;
