import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from './index';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const HeightWidthCentered = () => (
  <Wrapper>
    <LoadingIndicator />
  </Wrapper>
);

export default HeightWidthCentered;
