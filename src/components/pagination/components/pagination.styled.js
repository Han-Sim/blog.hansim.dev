import styled from 'styled-components';

export const PaginationRootContainer = styled.div`
  margin: 45px 0;
`;

export const PreviousPostContainer = styled.div`
  margin-top: 15px;
`

export const PostTitleLabel = styled.div`
  width: 100px;
  margin-right: 30px;
  margin-left: 2px;
  color: ${({ theme }) => theme.color.lightGray}
`;
