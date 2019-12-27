import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingIndicator from './index';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${x => (x.inline ? '0px' : '25px 0')};
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
