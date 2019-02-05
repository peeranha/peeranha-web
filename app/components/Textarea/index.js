import styled from 'styled-components';
import { gray, blue, black, pink, transparent } from 'style-constants';

const Textarea = styled.textarea`
  height: 200px;
  width: 100%;
  border: 1px solid ${props => (props.error ? `${pink}` : gray)};
  box-shadow: 0 0 0 3px ${props => (props.error ? `${pink}66` : transparent)};
  border-radius: 3px;
  padding: 9px 42px 9px 14px;
  color: ${black};
  font-family: Source Sans Pro, sans-serif;
  font-size: 16px;
  line-height: 20px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px ${props => (props.error ? `${pink}66` : `${blue}66`)};
    border-color: ${props => (props.error ? `${pink}` : `${blue}`)};
  }

  :disabled {
    opacity: 0.5;
  }
`;

export default Textarea;
