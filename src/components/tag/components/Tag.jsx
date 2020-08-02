import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Chip from "@material-ui/core/Chip";
import { slugify } from "src/util/helpers";

import style from "./tag.module.scss";

const Tag = ({ classes, count, tag, onClick, ...otherProps }) => {
  const label = useMemo(() => {
    if (count) {
      return `${tag} (${count})`;
    }
    return tag;
  }, [count, tag]);

  const handleTagOnClick = useCallback(() => {
    navigate(`/tag/${slugify(tag)}`);
    onClick && onClick();
  }, [onClick, tag]);

  return (
    <span className={style.tag}>
      <Chip
        label={label}
        classes={{
          root: style.root,
          ...classes,
        }}
        clickable
        onClick={handleTagOnClick}
        {...otherProps}
      />
    </span>
  );
};

Tag.propTypes = {
  classes: PropTypes.shape({}),
  count: PropTypes.number,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tag;
