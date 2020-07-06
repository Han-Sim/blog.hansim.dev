import React from "react";
import PropTypes from "prop-types";
import Tag from "../../tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ tags, postCountByTag }) => {
  return (
    <div className={style.container}>
      {tags.map(tag => (
        <Tag tag={tag} count={postCountByTag[tag]} />
      ))}
    </div>
  );
};

MenuTags.propTypes = {
  tags: PropTypes.array,
  postCountByTag: PropTypes.shape({}),
};

export default MenuTags;
