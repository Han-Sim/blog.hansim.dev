import styled from "styled-components";

export const MenuContainer = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 0 24px;
  box-shadow: 1px 2px 6px 0px ${({ theme }) => theme.color.lightGray};
  z-index: 1100;
`;

export const Logo = styled.div`
  display: block; // NOTE: https://stackoverflow.com/questions/32084460/safari-doesnt-render-css-gradient-text
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;

  // gradient color effect.
  background: linear-gradient( 90deg, #8184e8 0%, #9ebae6 20%, #c2bfe2 50%, #eeaeca 60%, #eeaeca 80%, #ff86a0 100% );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -o-background-clip: text;
  color: transparent;

  -webkit-transition: background 0.5s ease-out;
  -moz-transition: background 0.5s ease-out;
  -o-transition: background 0.5s ease-out;
  transition: background 0.5s ease-out;

  // transition trick for linear-gradient with background-position
  // https://stackoverflow.com/questions/6542212/use-css3-transitions-with-gradient-backgrounds
  &:hover {
    background-position: 163px;
  }
`

export const HamburgerMenuIcon = styled.div`
  width: 20px;
  height: 30px;
  position: fixed;
  top: 24px;
  right: 40px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: 1300;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: ${({ theme }) => theme.color.darkGray};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 0px;
  }

  span:nth-child(2),
  span:nth-child(3) {
    top: 6px;
  }

  span:nth-child(4) {
    top: 12px;
  }

  ${({ isMenuDrawerOpen }) => isMenuDrawerOpen ? `
    span:nth-child(1) {
      top: 6px;
      width: 0%;
      left: 50%;
    }

    span:nth-child(2) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    span:nth-child(3) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    span:nth-child(4) {
      top: 18px;
      width: 0%;
      left: 50%;
    }
  ` : undefined}
`;

