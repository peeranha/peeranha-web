import styled from 'styled-components';
import { darkgray } from 'style-constants';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
    margin: 0;
  }

  [data-icon='arrow'] span {
    display: inline-block;
    transition: 0.5s;
    stroke: ${darkgray};
  }

  button[aria-expanded='true'] [data-icon='arrow'] span {
    transform: rotate(180deg);
  }
`;

export default DropdownStyled;
