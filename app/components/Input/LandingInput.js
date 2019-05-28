import styled from 'styled-components';
import { LANDING_FONT, BG_LIGHT } from 'style-constants';

import { Input } from './InputStyled';

export default styled.input`
  ${x => Input({ error: x.error, warning: x.warning })};

  height: 48px;
  background: ${BG_LIGHT};
  font-family: ${LANDING_FONT};
  padding-left: 15px;
  padding-right: 15px;
`;
