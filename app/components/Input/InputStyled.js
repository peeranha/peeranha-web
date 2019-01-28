import { gray, blue, black } from 'style-constants';
import styled from 'styled-components';

const InputStyled = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  transition: 0.5s;

  .chevron {
    position: absolute;
    right: 14px;
    cursor: pointer;
    color: ${props => (props.isText ? blue : gray)};
  }

  input {
    flex: 1;
    height: 40px;
    border: 1px solid ${gray};
    border-radius: 3px;
    padding: 9px 42px 9px 14px;
    color: ${black};
    font-family: Source Sans Pro, sans-serif;
    font-size: 16px;
    line-height: 20px;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 3px rgba(118, 153, 255, 0.4);
      border-color: ${blue};
    }
  }

  :disabled {
    opacity: 0.5;
  }
`;

export default InputStyled;
