import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

const MenuStyled = styled.div`
  margin: 10px 0;
  padding: 0;
  border-radius: 5px;
  min-width: auto;
  overflow: hidden;
  background-color: ${BG_LIGHT};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
`;

export default MenuStyled;
