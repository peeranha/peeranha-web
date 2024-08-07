/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { BORDER_SECONDARY, BG_TRANSPARENT } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const CELL = 24;

const Img = styled.img`
  border-radius: ${(x) => (x.notRounded ? 0 : 50)}%;

  border: ${({ customBorderStyle, isBordered }) =>
    customBorderStyle ||
    `${isBordered ? 1 : 0}px solid ${
      isSuiBlockchain
        ? colors.linkColor
        : graphCommunity
        ? '#3D3D54'
        : colors.userInformation || BORDER_SECONDARY
    }`};

  padding: ${(x) => (x.isBordered ? '1' : '0')}px;

  width: ${(x) => (x.size ? Math.floor(x.size * CELL) : CELL)}px;
  height: ${(x) => (x.size ? Math.floor(x.size * CELL) : CELL)}px;

  background: ${(x) => (x.bg ? x.bg : BG_TRANSPARENT)};

  object-fit: ${(x) => (x.noScale ? '' : 'scale-down')};
  display: inline-block;
`;

export default Img;
