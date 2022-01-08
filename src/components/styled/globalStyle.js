import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.font.sansSerif};
    color: ${({ theme }) => theme.color.darkGray};
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.color.blue};
    text-decoration: none;
    border-bottom: 1.5px dashed ${({ theme }) => theme.color.blue};

    &:hover {
      color: ${({ theme }) => theme.color.eclipse};
      border-bottom-color: ${({ theme }) => theme.color.eclipse};
    }
  }
`;

export default GlobalStyle;
