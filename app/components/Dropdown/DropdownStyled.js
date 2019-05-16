import styled from 'styled-components';
import { TEXT_SECONDARY } from 'style-constants';

import IconStyled from 'components/Icon/IconStyled';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
    margin: 0;
  }

  ${IconStyled} {
    display: inline-block;
    transition: 0.5s;
    stroke: ${TEXT_SECONDARY};
  }

  button[aria-expanded='true'] [data-icon='arrow'] span {
    transform: rotate(180deg);
  }
`;

export default DropdownStyled;
