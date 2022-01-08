import React, { useContext } from "react";
import { navigate } from "gatsby";
import { KEY_ENTER, PATH_ALL_POSTS } from "src/util/constants";
import { Context } from "src/context";
import { HamburgerMenuIcon, Logo, MenuContainer } from "./menu.styled";

// TODO: hide it when scroll down if the screen height is small.
const Menu = () => {
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } = useContext(Context);

  return (
    <>
      <MenuContainer>
        <Logo
          onClick={() => {
            navigate(PATH_ALL_POSTS);
          }}
          onKeyDown={event => {
            if (event.key === KEY_ENTER) {
              navigate(PATH_ALL_POSTS);
            }
          }}
          role="button"
          tabIndex={0}
        >
          BLOG.HANSIM.DEV
        </Logo>
      </MenuContainer>
      {/* Fixed position in order to set z-index to float it on top of drawer menu */}
      <HamburgerMenuIcon
        id="hamburgerMenuIcon"
        isMenuDrawerOpen={isMenuDrawerOpen}
        // className={
        //   isMenuDrawerOpen
        //     ? classnames(style.hamburgerMenuIcon, style.hamburgerMenuIconOpen)
        //     : style.hamburgerMenuIcon
        // }
        onClick={() => {
          setIsMenuDrawerOpen(!isMenuDrawerOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenuIcon>
    </>
  );
};

export default Menu;
