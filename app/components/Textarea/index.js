import styled from 'styled-components';

import { TEXT_DARK, APP_FONT, BG_LIGHT } from 'style-constants';

import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';

const Textarea = styled.textarea`
  height: 90px;
  width: 100%;
  border-radius: 3px;
  padding: 9px 42px 9px 14px;
  color: ${TEXT_DARK};
  font-family: ${APP_FONT};
  font-size: 16px;
  line-height: 20px;
  outline: none;
  background: ${BG_LIGHT};

  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  @media only screen and (max-width: 576px) {
    font-size: 14px;
    padding: 9px 12px;
  }
`;

export default Textarea;
