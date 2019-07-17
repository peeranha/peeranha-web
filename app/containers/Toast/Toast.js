import styled from 'styled-components';
import { LANDING_FONT } from 'style-constants';

import toastTypes from './toastTypes';

const Toast = styled.div`
  overflow: hidden;
  display: flex;
  width: 320px;
  background: #fff;
  box-shadow: 0px 3px 10px 0 rgba(40, 40, 40, 0.3);
  align-items: center;
  text-align: left;
  padding: 5px 15px;
  white-space: pre-line;
  min-height: 50px;
  margin: 10px 25px 15px 25px;
  border-radius: 5px;
  color: ${props => toastTypes[props.type].color};

  .status {
    padding-right: 15px;
  }

  .content {
    flex: 1;
    line-height: 1.63;
    letter-spacing: -0.6px;
    font-size: 16px;
    font-family: ${LANDING_FONT};
    padding: 20px 0;
  }
`;

export default Toast;
