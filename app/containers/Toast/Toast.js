import styled from 'styled-components';
import toastTypes from './toastTypes';

const Toast = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5px 15px;
  white-space: pre-line;
  min-height: 50px;
  margin: 10px 25px;
  border-radius: 5px;
  background: ${props => toastTypes[props.type].backgroundColor};
  border: 2px solid ${props => toastTypes[props.type].borderColor};
  color: ${props => toastTypes[props.type].color};
`;

export default Toast;
