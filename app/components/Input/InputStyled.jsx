import {
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  TEXT_SECONDARY,
  TEXT_PRIMARY,
  BORDER_PRIMARY,
  TEXT_DARK,
  BORDER_WARNING_LIGHT,
  APP_FONT,
  BG_LIGHT,
} from 'style-constants';

import styled from 'styled-components';

/* eslint indent: 0 */
const ErrorHandling = error => `
  border: 1px solid ${error ? `${BORDER_WARNING_LIGHT}` : BORDER_SECONDARY};
  box-shadow: 0 0 0 3px ${
    error ? `${BORDER_WARNING_LIGHT}66` : BORDER_TRANSPARENT
  };
  border-radius: 3px;
`;

const DisableHandling = disabled => `
  opacity: ${disabled ? 0.6 : 1};
`;

const Input = ({ error, disabled }) =>
  `
    flex: 1;
    height: 40px;
    min-height: 40px;
    ${ErrorHandling(error)}
    ${DisableHandling(disabled)}
    padding: 9px 42px 9px 14px;
    color: ${TEXT_DARK};
    font-family: ${APP_FONT};
    font-size: 16px;
    line-height: 20px;
    outline: none;

    @media only screen and (max-width: 576px) {
      height: 36px;
      min-height: 36px;
      font-size: 14px;
      padding: 9px 12px;
    }
  `;

const InputStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.5s;
  flex: 1;

  img {
    position: absolute;
    right: 14px;
    cursor: pointer;
    color: ${props => (props.isText ? TEXT_PRIMARY : TEXT_SECONDARY)};
  }

  input {
    width: 100%;
    background: ${BG_LIGHT};
    ${props => Input(props)} &:focus {
      box-shadow: 0 0 0 3px
        ${props =>
          props.error ? `${BORDER_WARNING_LIGHT}66` : `${BORDER_PRIMARY}66`};
      border-color: ${props =>
        props.error ? `${BORDER_WARNING_LIGHT}` : `${BORDER_PRIMARY}`};
    }

    :disabled {
      ${() => DisableHandling(true)};
    }
  }
`;

export { Input, ErrorHandling, DisableHandling };
export default InputStyled;
