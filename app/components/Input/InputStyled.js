import {
  gray,
  blue,
  black,
  pink,
  transparent,
  APP_FONT,
} from 'style-constants';
import styled from 'styled-components';

const ErrorHandling = error => `
  border: 1px solid ${error ? `${pink}` : gray};
  box-shadow: 0 0 0 3px ${error ? `${pink}66` : transparent};
  border-radius: 3px;
`;

const DisableHandling = disabled => `
  opacity: ${disabled ? 0.6 : 1};
`;

const Input = ({ error, disabled }) =>
  `
    flex: 1;
    height: 40px;
    ${ErrorHandling(error)}
    ${DisableHandling(disabled)}
    padding: 9px 42px 9px 14px;
    color: ${black};
    font-family: ${APP_FONT};
    font-size: 16px;
    line-height: 20px;
    outline: none;
  `;

/* istanbul ignore next */
const InputStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.5s;
  flex: 1;

  .chevron {
    position: absolute;
    right: 14px;
    cursor: pointer;
    color: ${props => (props.isText ? blue : gray)};
  }

  input {
    ${props => Input(props)} &:focus {
      box-shadow: 0 0 0 3px
        ${props => (props.error ? `${pink}66` : `${blue}66`)};
      border-color: ${props => (props.error ? `${pink}` : `${blue}`)};
    }

    :disabled {
      ${() => DisableHandling(true)};
    }
  }
`;

export { Input, ErrorHandling, DisableHandling };
export default InputStyled;
