import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from './index';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

const WidthCentered = () => (
  <Wrapper>
    <LoadingIndicator />
  </Wrapper>
);

export default React.memo(WidthCentered);
