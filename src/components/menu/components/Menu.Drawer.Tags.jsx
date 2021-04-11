import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import Tag from "src/components/tag";
import { CATEGORY_ALL_POSTS } from "src/util/constants";
import { Context } from "src/context";
import style from "./menu.drawer.tags.module.scss";

const MenuDrawerTags = ({ postCountByTag }) => {
  const { setIsMenuOpen, setActiveMenu } = useContext(Context);

  const handleTagOnClick = () => {
    setIsMenuOpen(false);
    setActiveMenu(CATEGORY_ALL_POSTS);
  };

  const tagsToRender = useMemo(() => {
    const arr = [];
    for (const [index, [tag, count]] of Object.entries(
      postCountByTag
    ).entries()) {
      arr.push(
        <Tag
          tag={tag}
          key={tag}
          count={count}
          onClick={handleTagOnClick}
          isLastTag={index === Object.entries(postCountByTag).length - 1}
        />
      );
    }

    return arr;
  }, [postCountByTag, handleTagOnClick]);

  return <div className={style.container}>{tagsToRender}</div>;
};

MenuDrawerTags.propTypes = {
  postCountByTag: PropTypes.shape({}),
};

export default MenuDrawerTags;
