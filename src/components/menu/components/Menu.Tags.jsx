import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Tag from "../../tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ tags, postCountByTagDescOrder }) => {
  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [tag, count] of Object.entries(postCountByTagDescOrder)) {
      if (tags.includes(tag)) {
        arr.push(<Tag tag={tag} count={count} />);
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
