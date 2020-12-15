import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { singleCommunityColors } from 'utils/communityManagement';

import LoadingIndicator from './index';

const colors = singleCommunityColors();

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  background: ${colors.mainBackground
    ? colors.mainBackground
    : 'rgb(234, 236, 244)'};
`;

const WidthCentered = ({ inline = false }) => (
  <Wrapper inline={inline}>
    <LoadingIndicator />
  </Wrapper>
);

WidthCentered.propTypes = {
  inline: PropTypes.bool,
};

export default WidthCentered;
