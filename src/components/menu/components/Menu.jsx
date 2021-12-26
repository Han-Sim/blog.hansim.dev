import React, { forwardRef, useContext, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  convertArrayToObjectOfCountOccurrences,
  sortObjectByValueInDescOrder,
} from "src/util/helpers";
import { Context } from "src/context";
import MenuDrawer from "./Menu.Drawer";

// TODO: remove ref.
const Menu = forwardRef((_props, ref) => {
  const { setIsMenuOpen } = useContext(Context);
  // TODO: move all of this logic to drawer.
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const { edges = [] } = data.allMarkdownRemark;

  // Post count by tag and sort it by descending order.
  const postCountByTag = useMemo(() => {
    const tagsAll = [];

    edges.forEach(edge => {
      tagsAll.push(...edge.node.frontmatter.tags);
    });

    return sortObjectByValueInDescOrder(
      convertArrayToObjectOfCountOccurrences(tagsAll)
    );
  }, [edges]);

  return (
    <>
      <IconButton
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <MenuDrawer postCountByTag={postCountByTag} />
    </>
  );
});

export default Menu;
