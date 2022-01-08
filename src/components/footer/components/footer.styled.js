import styled from 'styled-components';

export const FooterRootContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  margin-top: 30px;
  background-color: #f8f8fc;
  font-family: ${({ theme }) => theme.font.sansSerif};
  font-size: 12px;
  color: $color-dark-gray;
`;

export const FooterTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
  padding-top: 12px;
`;

export const FooterCopyRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const FooterDivider = styled.span`
  border-right: 1px solid ${({ theme }) => theme.color.lightGray};
  height: 10px;
  margin: 0 10px;
`