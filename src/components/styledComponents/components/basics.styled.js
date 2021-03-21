import styled from "styled-components";
import { Link } from "gatsby";
// import { colorYellow, colorLightGray } from "../../../styles/variables.module.scss";

const StyledLink = styled(Link)`
  color: ${({ color }) => color};
  text-decoration: none;

  &:hover {
    color: ${({ colorOnHover }) => colorOnHover};
  }
`;

export { StyledLink };
