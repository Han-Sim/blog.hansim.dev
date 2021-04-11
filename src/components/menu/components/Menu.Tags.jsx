import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Tag from "src/components/tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ postCountByTagDescOrder, onClick }) => {
  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [index, [tag, count]] of Object.entries(
      postCountByTagDescOrder
    ).entries()) {
      arr.push(
        <Tag
          tag={tag}
          count={count}
          onClick={onClick}
          isLastTag={
            index === Object.entries(postCountByTagDescOrder).length - 1
          }
        />
      );
    }

    return arr;
  }, [postCountByTagDescOrder, onClick]);

  return <div className={style.container}>{tagsToRender}</div>;
};

MenuTags.propTypes = {
  postCountByTagDescOrder: PropTypes.shape({}),
  onClick: PropTypes.func,
};

export default MenuTags;
