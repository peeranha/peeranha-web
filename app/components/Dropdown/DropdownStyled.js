import styled from 'styled-components';
import { darkgray } from 'style-constants';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
    margin: 0;
  }

  span[data-icon='icon'] {
    display: inline-block;
    transition: 0.5s;
    stroke: ${darkgray};
  }

  button[aria-expanded='true'] span[data-icon='icon'] {
    transform: rotate(180deg);
  }
`;

export default DropdownStyled;
