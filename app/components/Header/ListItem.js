import styled from 'styled-components';

const ListItem = styled.li`
  padding: 8px 8px 0 12px;
  font-size: 18px;
  @media only screen and (min-width: 992px) {
    &:first-child {
      padding-left: 32px;
    }
  }
`;

export default ListItem;
