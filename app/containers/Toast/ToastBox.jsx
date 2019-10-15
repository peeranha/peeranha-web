import styled from 'styled-components';

import { BOTTOM_RIGHT, BOTTOM_LEFT, TOP_RIGHT, TOP_LEFT } from './constants';

const toastsLocation = {
  [TOP_LEFT]: `
    left: 0;
    flex-direction: column;
  `,
  [BOTTOM_LEFT]: `
    left: 0;
    flex-direction: column-reverse;
  `,
  [TOP_RIGHT]: `
    right: 0;
    flex-direction: column;
  `,
  [BOTTOM_RIGHT]: `
    right: 0;
    flex-direction: column-reverse;
  `,
};

const ToastBox = styled.div`
  z-index: 9999999999;
  position: fixed;
  display: flex;
  max-height: 100vh;
  ${x => toastsLocation[x.location]};
`;

export default ToastBox;
