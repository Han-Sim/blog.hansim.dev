import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { KEY_ENTER } from "src/util/constants";
import { slugify } from "src/util/helpers";

import style from "./tag.module.scss";

const Tag = ({ count, key, tag, onClick, isLastTag }) => {
  const label = useMemo(() => {
    if (!isLastTag) {
      if (count) {
        return (
          <>
            <div className={style.tag}>{tag}</div>
            <div className={style.count}>({count})</div>
            <div className={style.comma}>,</div>
          </>
        );
      }

      return (
        <>
          <div className={style.tag}>{tag}</div>
          <div className={style.comma}>,</div>
        </>
      );
    }

    if (count) {
      return (
        <>
          <div className={style.tag}>{tag}</div>
          <div className={style.count}>({count})</div>
        </>
      );
    }

    return <div className={style.tag}>{tag}</div>;
  }, [count, tag, isLastTag]);

  const handleTagOnClick = () => {
    navigate(`/tag/${slugify(tag)}`);
    onClick && onClick();
  };

  const handleTagOnKeyDown = event => {
    if (event.keyCode === KEY_ENTER) {
      navigate(`/tag/${slugify(tag)}`);
      onClick && onClick();
    }
  };

  return (
    <div
      className={style.tagContainer}
      key={key}
      onClick={handleTagOnClick}
      onKeyDown={handleTagOnKeyDown}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
};

Tag.propTypes = {
  count: PropTypes.number,
  isLastTag: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  key: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tag;
