import {
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  TEXT_SECONDARY,
  TEXT_PRIMARY,
  TEXT_DARK,
  APP_FONT,
  BG_LIGHT,
  BORDER_PRIMARY_RGB,
  BORDER_WARNING_LIGHT_RGB,
} from 'style-constants';

import styled from 'styled-components';

/* eslint indent: 0 */
const ErrorHandling = error => `
  border: 1px solid ${
    error ? `rgb(${BORDER_WARNING_LIGHT_RGB})` : BORDER_SECONDARY
  };
  box-shadow: 0 0 0 3px ${
    error ? `rgba(${BORDER_WARNING_LIGHT_RGB}, 0.40)` : BORDER_TRANSPARENT
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
    color: ${x => (x.isText ? TEXT_PRIMARY : TEXT_SECONDARY)};
  }

  input {
    width: 100%;
    background: ${BG_LIGHT};
    ${props => Input(props)} &:focus {
      box-shadow: 0 0 0 3px
        ${props =>
          props.error
            ? `rgba(${BORDER_WARNING_LIGHT_RGB}, 0.40)`
            : `rgba(${BORDER_PRIMARY_RGB}, 0.40)`};
      border-color: ${props =>
        props.error
          ? `rgb(${BORDER_WARNING_LIGHT_RGB})`
          : `rgb(${BORDER_PRIMARY_RGB})`};
    }

    :disabled {
      ${() => DisableHandling(true)};
    }
  }
`;

export { Input, ErrorHandling, DisableHandling };
export default InputStyled;
