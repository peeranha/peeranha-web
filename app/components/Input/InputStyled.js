import { gray, blue, black, pink, transparent } from 'style-constants';
import styled from 'styled-components';

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
    flex: 1;
    height: 40px;
    border-radius: 3px;
    border: 1px solid ${props => (props.error ? `${pink}` : gray)};
    box-shadow: 0 0 0 3px ${props => (props.error ? `${pink}66` : transparent)};
    padding: 9px 42px 9px 14px;
    color: ${black};
    font-family: Source Sans Pro, sans-serif;
    font-size: 16px;
    line-height: 20px;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 3px
        ${props => (props.error ? `${pink}66` : `${blue}66`)};
      border-color: ${props => (props.error ? `${pink}` : `${blue}`)};
    }

    :disabled {
      opacity: 0.5;
    }
  }
`;

export default InputStyled;
