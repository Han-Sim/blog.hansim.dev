import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { slugify } from "src/util/helpers";
import { InternalLink } from "../../styled";
import { TagCount, TagRootContainer } from "./tag.styled";

const Tag = ({ count, tag, onClick, isLastTag }) => {
  const label = useMemo(() => {
    if (count) {
      return (
        <>
          <span>{tag}</span>
          <TagCount>({count})</TagCount>
        </>
      );
    }

    return <span>{tag}</span>;
  }, [count, tag]);

  const handleTagOnClick = () => {
    navigate(`/tag/${slugify(tag)}`);
    onClick && onClick();
  };

  return (
    <TagRootContainer>
      <InternalLink
        style={{
          display: "flex",
          alignItems: "center",
        }}
        key={tag}
        onClick={handleTagOnClick}
      >
        {label}
      </InternalLink>
      {!isLastTag && (
        <span style={{ marginLeft: "2px", marginRight: "7px" }}>,</span>
      )}
    </TagRootContainer>
  );
};

Tag.propTypes = {
  count: PropTypes.number,
  isLastTag: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Tag;
