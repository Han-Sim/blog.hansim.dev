import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Tag from "../../tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ tags, postCountByTagDescOrder }) => {
  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [tag, count] of Object.entries(postCountByTagDescOrder)) {
      if (tags.includes(tag)) {
        if (count >= 5) {
          arr.push(<Tag tag={tag} count={count} color="primary" />);
        } else {
          arr.push(<Tag tag={tag} count={count} variant="outlined" />);
        }
      }
    }
    return arr;
  }, [tags, postCountByTagDescOrder]);

  return <div className={style.container}>{tagsToRender}</div>;
};

MenuTags.propTypes = {
  tags: PropTypes.array,
  postCountByTagDescOrder: PropTypes.shape({}),
};

export default MenuTags;
