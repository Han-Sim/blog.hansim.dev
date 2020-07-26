import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Tag from "src/components/tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ tags, postCountByTagDescOrder, onClick }) => {
  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [tag, count] of Object.entries(postCountByTagDescOrder)) {
      if (tags.includes(tag)) {
        if (count >= 5) {
          arr.push(
            <Tag tag={tag} count={count} color="primary" onClick={onClick} />
          );
        } else {
          arr.push(
            <Tag tag={tag} count={count} variant="outlined" onClick={onClick} />
          );
        }
      }
    }
    return arr;
  }, [tags, postCountByTagDescOrder, onClick]);

  return <div className={style.container}>{tagsToRender}</div>;
};

MenuTags.propTypes = {
  tags: PropTypes.array,
  postCountByTagDescOrder: PropTypes.shape({}),
  onClick: PropTypes.func,
};

export default MenuTags;