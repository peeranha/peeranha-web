import styled from 'styled-components';
import {
  BORDER_SECONDARY,
  BORDER_WARNING_LIGHT,
  BORDER_PRIMARY,
  TEXT_DARK,
  BORDER_TRANSPARENT,
  APP_FONT,
} from 'style-constants';

/* eslint indent: 0 */

const Textarea = styled.textarea`
  height: 90px;
  width: 100%;
  border: 1px solid
    ${x => (x.error ? `${BORDER_WARNING_LIGHT}` : BORDER_SECONDARY)};
  box-shadow: 0 0 0 3px
    ${x => (x.error ? `${BORDER_WARNING_LIGHT}66` : BORDER_TRANSPARENT)};
  border-radius: 3px;
  padding: 9px 42px 9px 14px;
  color: ${TEXT_DARK};
  font-family: ${APP_FONT};
  font-size: 16px;
  line-height: 20px;
  outline: none;

  @media only screen and (max-width: 576px) {
    font-size: 14px;
    padding: 9px 12px;
  }

  &:focus {
    box-shadow: 0 0 0 3px
      ${x => (x.error ? `${BORDER_WARNING_LIGHT}66` : `${BORDER_PRIMARY}66`)};
    border-color: ${x =>
      x.error ? `${BORDER_WARNING_LIGHT}` : `${BORDER_PRIMARY}`};
  }

  :disabled {
    opacity: 0.5;
  }
`;

export default Textarea;
