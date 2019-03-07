/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';

const LoadingIndicatorStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <LoadingIndicatorStyled>
      <LoadingIndicator />
    </LoadingIndicatorStyled>
  ),
});
