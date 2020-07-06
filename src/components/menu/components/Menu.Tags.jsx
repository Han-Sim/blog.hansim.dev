import React from "react";
import PropTypes from "prop-types";
import Tag from "../../tag";

import style from "./menu.tags.module.scss";

const MenuTags = ({ tags, postCountByTag }) => {
  return (
    <div>
      <Tag tag={tags[0]} count={postCountByTag[tags[0]]} />
    </div>
  );
};

MenuTags.propTypes = {
  tags: PropTypes.array,
  postCountByTag: PropTypes.shape({}),
};

export default MenuTags;
