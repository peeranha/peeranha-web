import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TEXT_PRIMARY,
  BG_PRIMARY_TRANSPARENT,
  BG_PRIMARY_LIGHT,
} from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const transparentModalBackgroundColor =
  colors.blockedInfoArea || BG_PRIMARY_TRANSPARENT;
const ModalDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: ${BG_PRIMARY_LIGHT};
  background-image: linear-gradient(
    45deg,
    ${transparentModalBackgroundColor} 15%,
    transparent 15%,
    transparent 35%,
    ${transparentModalBackgroundColor} 35%,
    ${transparentModalBackgroundColor} 65%,
    transparent 65%,
    transparent 85%,
    ${transparentModalBackgroundColor} 85%
  );
  background-size: 50px 50px;
  background-repeat: repeat;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalMessage = styled.p`
  color: ${colors.linkColor || TEXT_PRIMARY};
  font-size: 1.5em;
  font-weight: bold;
  position: relative;
  top: -50px;
  margin: 0 40px;
  text-align: center;
`;

const BlockedInfoArea = ({ children }) => (
  <ModalDiv>
    <ModalMessage>{children}</ModalMessage>
  </ModalDiv>
);

BlockedInfoArea.propTypes = {
  children: PropTypes.any,
};

export default BlockedInfoArea;
