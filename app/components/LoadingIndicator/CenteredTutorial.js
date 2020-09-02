import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingIndicator from './index';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WidthCentered = ({ inline }) => (
  <Wrapper inline={inline}>
    <LoadingIndicator />
  </Wrapper>
);

WidthCentered.propTypes = {
  inline: PropTypes.bool,
};

export default React.memo(WidthCentered);
