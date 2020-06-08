import React, { memo } from 'react';
import styled from 'styled-components';

import { BG_PRIMARY_LIGHT } from 'style-constants';
import LoadingIndicator from './HeightWidthCentered';

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${BG_PRIMARY_LIGHT};
  z-index: 1000000;
`;

export default memo(() => (
  <Div>
    <LoadingIndicator />
  </Div>
));
