import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { slugify } from "../../../util/helperFunctions";

import style from "./tag.module.scss";

const Tag = ({ classes, count, tag, ...otherProps }) => {
  const label = useMemo(() => {
    if (count) {
      return `${tag} (${count})`;
    }
    return tag;
  }, [count, tag]);

  return (
    <a href={`/tag/${slugify(tag)}`} key={tag} className={style.tag}>
      <Chip
        label={label}
        classes={{
          root: style.root,
          ...classes,
        }}
        clickable
        {...otherProps}
      />
    </a>
  );
};

Tag.propTypes = {
  classes: PropTypes.shape({}),
  count: PropTypes.number,
  tag: PropTypes.string,
};

export default Tag;
