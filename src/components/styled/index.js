import styled from 'styled-components';

export const InternalLink = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.color.darkGray};
  text-decoration: none;
  border-bottom: 1.5px dashed ${({ theme }) => theme.color.darkGray};

  &:hover {
    color: ${({ theme }) => theme.color.eclipse};
    border-bottom-color: ${({ theme }) => theme.color.eclipse};
  }
`;

export const InternalLinkPostTitle = styled(InternalLink)`
  display: inline-block;
  font-size: 30px;
`
