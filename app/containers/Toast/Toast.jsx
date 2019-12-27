import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

import toastTypes from './toastTypes';

const Toast = styled.div`
  overflow: hidden;
  display: flex;
  width: 320px;
  background: ${BG_LIGHT};
  box-shadow: 0px 3px 10px 0 rgba(40, 40, 40, 0.3);
  align-items: center;
  text-align: left;
  white-space: pre-line;
  min-height: 50px;
  margin: 10px 25px 15px 25px;
  padding: 15px;
  border-radius: 5px;
  color: ${x => toastTypes[x.type].color};

  @media only screen and (max-width: 576px) {
    width: 270px;
    margin: 5px;
  }
`;

export default Toast;
